package com.wordleapp.user.controller;

import com.wordleapp.user.User;
import com.wordleapp.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "user")
@AllArgsConstructor
public class UserController {

    UserService userService;

    @GetMapping()
    public ResponseEntity<List<User>> getUsers(){
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{nickname}")
    public ResponseEntity<UserDetails> getUser(@PathVariable String nickname){
        return new ResponseEntity<>(userService.loadUserByUsername(nickname), HttpStatus.OK);
    }
}
