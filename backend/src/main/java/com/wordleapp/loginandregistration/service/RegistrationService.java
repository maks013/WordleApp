package com.wordleapp.loginandregistration.service;

import com.wordleapp.loginandregistration.RegistrationRequest;
import com.wordleapp.user.User;
import com.wordleapp.user.roles.UserRole;
import com.wordleapp.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserService userService;

    public String register(RegistrationRequest request) {

        String token = userService.signUpUser(
                new User(
                        request.getNickname(),
                        request.getPassword(),
                        UserRole.USER
                )
        );

        return token;
    }
}
