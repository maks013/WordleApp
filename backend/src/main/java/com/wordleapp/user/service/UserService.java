package com.wordleapp.user.service;

import com.wordleapp.user.User;
import com.wordleapp.user.repo.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG =
            "user with nickname %s not found";

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByNickname(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, username)));
    }

    public String signUpUser(User user) {
        boolean userExists = userRepository
                .findByNickname(user.getNickname())
                .isPresent();

        if (userExists) {
            throw new IllegalStateException("nickname already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(user.getPassword());

        user.setPassword(encodedPassword);

        userRepository.save(user);

        return UUID.randomUUID().toString();
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findByNickname(String nickname){
        return userRepository.findByNickname(nickname);
    }
}
