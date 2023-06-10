package com.wordleapp.game.controller;

import com.wordleapp.game.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/game")
@AllArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/play/{nickname}")
    public ResponseEntity<?> playGame(@PathVariable String nickname){
        gameService.playGame(nickname);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/win/{nickname}")
    public ResponseEntity<?> winGame(@PathVariable String nickname){
        gameService.winGame(nickname);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
