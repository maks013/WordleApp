package com.wordleapp.loginandregistration.service;

import com.wordleapp.loginandregistration.LoginRequest;
import com.wordleapp.loginandregistration.LoginResponse;
import com.wordleapp.security.PasswordEncoder;
import com.wordleapp.user.User;
import com.wordleapp.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class LoginService {

    private final UserService userService;

    public LoginResponse login(LoginRequest request) {

        final Optional<User> optionalUser = userService.findByNickname(request.getNickname());

        if (optionalUser.isPresent()) {
            final String password = request.getPassword();
            final String encodedPassword = optionalUser.get().getPassword();
            boolean isPassRight = PasswordEncoder.bCryptPasswordEncoder().matches(password,encodedPassword);
            if(isPassRight){
                return new LoginResponse("Login success",true);
            }else{
                return new LoginResponse("Password not match",false);
            }
        } else {
            return new LoginResponse("Email not exists", false);
        }
    }
}
