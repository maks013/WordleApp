import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

const Block = ({
  index,
  guess,
  word,
  guessed,
}: {
  index: number;
  guess: string;
  word: string;
  guessed: boolean;
}) => {
  const letter = guess[index];
  const wordLetter = word[index];

  const blockStyles: any[] = [styles.guessSquare];
  const textStyles: any[] = [styles.guessLetter];

  if (letter === wordLetter && guessed) {
    blockStyles.push(styles.guessCorrect);
    textStyles.push(styles.guessedLetter);
  } else if (word.includes(letter) && guessed) {
    blockStyles.push(styles.guessInWord);
    textStyles.push(styles.guessedLetter);
  } else if (guessed) {
    blockStyles.push(styles.guessNotInWord);
    textStyles.push(styles.guessedLetter);
  }

  return (
    <View style={blockStyles}>
      <Text style={textStyles}>{letter}</Text>
    </View>
  );
};

const GuessRow = ({
  guess,
  word,
  guessed,
}: {
  guess: string;
  word: string;
  guessed: boolean;
}) => {
  return (
    <View style={styles.guessRow}>
      <Block index={0} guess={guess} word={word} guessed={guessed} />
      <Block index={1} guess={guess} word={word} guessed={guessed} />
      <Block index={2} guess={guess} word={word} guessed={guessed} />
      <Block index={3} guess={guess} word={word} guessed={guessed} />
      <Block index={4} guess={guess} word={word} guessed={guessed} />
    </View>
  );
};

const KeyboardRow = ({
  letters,
  onKeyPress,
}: {
  letters: string[];
  onKeyPress: (letter: string) => void;
}) => (
  <View style={styles.keyboardRow}>
    {letters.map(letter => (
      <TouchableOpacity onPress={() => onKeyPress(letter)} key={letter}>
        <View style={styles.key}>
          <Text style={styles.keyLetter}>{letter}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const Keyboard = ({onKeyPress}: {onKeyPress: (letter: string) => void}) => {
  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'];

  return (
    <View style={styles.keyboard}>
      <KeyboardRow letters={row1} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row2} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row3} onKeyPress={onKeyPress} />
      <View style={styles.keyboardRow}>
        <TouchableOpacity onPress={() => onKeyPress('ENTER')}>
          <View style={styles.key}>
            <Text style={styles.keyLetter}>ENTER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const apiUrl =
  'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words';
const words: string[] = [];

async function fetchWords() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.text();
    const wordsArray = data.split('\n');
    wordsArray.forEach(word => words.push(word.toUpperCase()));
  } catch (error) {
    console.error('Error fetching words:', error);
  }
}

fetchWords();

const winGame = async nickname => {
  try {
    await axios.post(`http://192.168.0.106:8080/game/win/${nickname}`);
    console.log('You win!');
  } catch (error) {
    console.error(error);
  }
};

interface IGuess {
  [key: number]: string;
}

const defaultGuess: IGuess = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
};

const GameScreen = () => {
  const [activeWord, setActiveWord] = React.useState(words[0]);
  const [guessIndex, setGuessIndex] = React.useState(0);
  const [guesses, setGuesses] = useState<IGuess>(defaultGuess);
  const [gameComplete, setGameComplete] = React.useState(false);
  const route = useRoute();
  const {nickname} = route.params;

  const handleKeyPress = (letter: string) => {
    const guess: string = guesses[guessIndex];

    if (letter === 'ENTER') {
      if (guess.length !== 5) {
        alert('Word too short.');
        return;
      }

      if (!words.includes(guess)) {
        alert('Not a valid word.');
        return;
      }

      if (guess === activeWord) {
        setGuessIndex(guessIndex + 1);
        setGameComplete(true);
        winGame(nickname);
        alert('You win!');
        return;
      }

      if (guessIndex < 5) {
        setGuessIndex(guessIndex + 1);
      } else {
        setGameComplete(true);
        alert('You lose!');
        return;
      }
    }

    if (letter === '⌫') {
      setGuesses({...guesses, [guessIndex]: guess.slice(0, -1)});
      return;
    }

    if (guess.length >= 5) {
      return;
    }

    setGuesses({...guesses, [guessIndex]: guess + letter});
  };

  React.useEffect(() => {
    if (!gameComplete) {
      setActiveWord(words[Math.floor(Math.random() * words.length)]);
      setGuesses(defaultGuess);
      setGuessIndex(0);
    }
  }, [gameComplete]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <GuessRow
          guess={guesses[0]}
          word={activeWord}
          guessed={guessIndex > 0}
        />
        <GuessRow
          guess={guesses[1]}
          word={activeWord}
          guessed={guessIndex > 1}
        />
        <GuessRow
          guess={guesses[2]}
          word={activeWord}
          guessed={guessIndex > 2}
        />
        <GuessRow
          guess={guesses[3]}
          word={activeWord}
          guessed={guessIndex > 3}
        />
        <GuessRow
          guess={guesses[4]}
          word={activeWord}
          guessed={guessIndex > 4}
        />
        <GuessRow
          guess={guesses[5]}
          word={activeWord}
          guessed={guessIndex > 5}
        />
      </View>
      <View>
        {gameComplete ? (
          <View style={styles.gameCompleteWrapper}>
            <Text>
              <Text style={styles.bold}>Correct Word: {activeWord}</Text>
            </Text>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  setGameComplete(false);
                  try {
                    await axios.post(
                      `http://192.168.0.106:8080/game/play/${nickname}`,
                    );
                    console.log('POST request sent successfully');
                  } catch (error) {
                    console.error(error);
                    alert('An error occurred while playing the game');
                  }
                }}>
                <Text style={styles.buttonText}>Play again</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <Keyboard onKeyPress={handleKeyPress} />
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  guessRow: {
    backgroundColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  guessSquare: {
    borderColor: '#787c7f',
    borderWidth: 1,
    borderRadius: 5,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  guessLetter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  guessedLetter: {
    color: '#fff',
  },
  guessCorrect: {
    backgroundColor: '#6aaa64',
    borderColor: '#6aaa64',
  },
  guessInWord: {
    backgroundColor: '#c9b458',
    borderColor: '#c9b458',
  },
  guessNotInWord: {
    backgroundColor: '#787c7e',
    borderColor: '#787c7e',
  },
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    flex: 1,
  },
  keyboard: {flexDirection: 'column', backgroundColor: '#333333'},
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  key: {
    backgroundColor: '#787c7f',
    padding: 10,
    margin: 3,
    borderRadius: 5,
  },
  keyLetter: {
    fontWeight: '500',
    fontSize: 15,
    color: '#FFFFFF',
  },
  gameCompleteWrapper: {
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  button: {
    marginVertical: 10,
    width: 350,
    paddingVertical: 10,
    backgroundColor: '#6ca965',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
