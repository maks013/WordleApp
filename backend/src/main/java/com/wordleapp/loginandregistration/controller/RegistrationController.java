package com.wordleapp.loginandregistration.controller;

import com.wordleapp.loginandregistration.RegistrationRequest;
import com.wordleapp.loginandregistration.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "registration")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
        return ResponseEntity.ok(registrationService.register(request));
    }
}
