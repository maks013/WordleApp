package com.wordleapp.loginandregistration.controller;

import com.wordleapp.loginandregistration.LoginRequest;
import com.wordleapp.loginandregistration.LoginResponse;
import com.wordleapp.loginandregistration.service.LoginService;
import com.wordleapp.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("login")
@AllArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        LoginResponse loginResponse = loginService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
    }

}
