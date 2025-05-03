package com.auth.jwt.controller;

import com.auth.jwt.data.dto.authorization.CredentialsDto;
import com.auth.jwt.data.dto.employee.RegisterEmployeeDto;
import com.auth.jwt.exception.AuthenticationException;
import com.auth.jwt.exception.RegistrationException;
import com.auth.jwt.service.AuthService;
import com.auth.jwt.util.ResponseUtil; // Import ResponseUtil
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor // Use Lombok for constructor injection
public class AuthController {

    private final AuthService authService;
    private final ResponseUtil responseUtil; // Inject ResponseUtil

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CredentialsDto credentialsDto) {
        try {
            // Delegate login logic to AuthService
            String token = authService.login(credentialsDto);
            // Use ResponseUtil for success response (assuming token should be in a map)
            return ResponseEntity.ok(Map.of("token", token));
        } catch (AuthenticationException e) {
            // Handle specific authentication errors from the service
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(responseUtil.createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // Handle unexpected errors during login
            log.error("Login error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(responseUtil.createErrorResponse("Wystąpił wewnętrzny błąd serwera podczas logowania."));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterEmployeeDto registerEmployeeDto) {
        try {
            // Delegate registration logic to AuthService
            String token = authService.register(registerEmployeeDto);
            // Use ResponseUtil for success response (assuming token should be in a map)
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RegistrationException e) {
            // Handle specific registration errors from the service (e.g., validation, user exists)
            return ResponseEntity.badRequest()
                    .body(responseUtil.createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // Handle unexpected errors during registration
            log.error("Registration error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(responseUtil.createErrorResponse("Wystąpił wewnętrzny błąd serwera podczas rejestracji."));
        }
    }

    // Removed isPasswordValid and isEmailValid methods as they are now in ValidationUtil
}

