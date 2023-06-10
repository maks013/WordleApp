package com.wordleapp.game.service;

import com.wordleapp.user.User;
import com.wordleapp.user.repo.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;


@Service
@AllArgsConstructor
public class GameService {

    private final UserRepository userRepository;

    public void playGame(String nickname){
        final Optional<User> user = userRepository.findByNickname(nickname);
        if (user.isPresent()) {
            user.ifPresent(user1 -> {
                Integer currentGames = user1.getGames();
                user1.setGames(addGame(Objects.requireNonNullElse(currentGames, 0)));
                userRepository.save(user1);
            });
        }
    }

    public void winGame(String nickname){
        final Optional<User> user = userRepository.findByNickname(nickname);
        if (user.isPresent()) {
            user.ifPresent(user1 -> {
                Integer currentWins = user1.getWins();
                user1.setWins(addWin(Objects.requireNonNullElse(currentWins, 0)));
                userRepository.save(user1);
            });
        }
    }

    private Integer addGame(Integer games){
        return games + 1;
    }

    private Integer addWin(Integer wins){
        return wins + 1;
    }

}
