package com.auth.jwt.controller;

import com.auth.jwt.data.dto.authorization.CredentialsDto;
import com.auth.jwt.data.dto.employee.RegisterEmployeeDto;
import com.auth.jwt.data.entity.auth.employee.Employee;
import com.auth.jwt.data.repository.auth.employee.EmployeeJpaRepository;
import com.auth.jwt.security.UserAuthProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class AuthController {

    private final EmployeeJpaRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserAuthProvider userAuthProvider;

    public AuthController(EmployeeJpaRepository employeeRepository, 
                         PasswordEncoder passwordEncoder,
                         UserAuthProvider userAuthProvider) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.userAuthProvider = userAuthProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody CredentialsDto credentialsDto) {
        Employee employee = employeeRepository.findByLogin(credentialsDto.getLogin());
        if (employee == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password"));
        }
        if (passwordEncoder.matches(String.valueOf(credentialsDto.getPassword()), employee.getPassword())) {
            String token = userAuthProvider.createToken(employee.getUserName());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password"));
    }


    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterEmployeeDto registerEmployee) {
        try {
            // Walidacja hasła
            String password = registerEmployee.getPassword();
            if (!isPasswordValid(password)) {
                return ResponseEntity.badRequest().body(Map.of("message",
                        "Hasło musi spełniać następujące warunki: " +
                                "zawierać minimum 6 znaków, " +
                                "przynajmniej jedną dużą literę, " +
                                "przynajmniej jeden znak specjalny (np. !@#$%^&*())"
                ));
            }

            // Walidacja adresu email
            String email = registerEmployee.getEmail();
            if (!isEmailValid(email)) {
                return ResponseEntity.badRequest().body(Map.of("message",
                        "Podany adres email jest nieprawidłowy. " +
                                "Adres email musi zawierać znak @ oraz prawidłową domenę."
                ));
            }

            // Sprawdzenie, czy użytkownik już istnieje
            Employee employee = employeeRepository.findByLogin(registerEmployee.getUserName());
            if (employee != null) {
                return ResponseEntity.badRequest().body(Map.of("message", "User already exists"));
            }

            // Sprawdzenie, czy email już istnieje
            employee = employeeRepository.findByEmail(registerEmployee.getEmail());
            if (employee != null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
            }

            // Tworzenie nowego użytkownika
            employee = new Employee();
            employee.setUserName(registerEmployee.getUserName());
            employee.setPassword(passwordEncoder.encode(registerEmployee.getPassword()));
            employee.setFirstName(registerEmployee.getFirstName());
            employee.setLastName(registerEmployee.getLastName());
            employee.setEmail(registerEmployee.getEmail());
            employeeRepository.save(employee);

            // Generowanie tokenu
            String token = userAuthProvider.createToken(employee.getUserName());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("register " + e);
            return ResponseEntity.badRequest().body(Map.of("message", "An error occurred"));
        }
    }

    /**
     * Walidacja hasła - sprawdza czy hasło ma minimum 6 znaków,
     * zawiera przynajmniej jedną dużą literę i jeden znak specjalny
     */
    private boolean isPasswordValid(String password) {
        if (password == null || password.length() < 6) {
            return false;
        }

        boolean hasUpperCase = false;
        boolean hasSpecialChar = false;
        String specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) {
                hasUpperCase = true;
            } else if (specialChars.indexOf(c) >= 0) {
                hasSpecialChar = true;
            }

            if (hasUpperCase && hasSpecialChar) {
                return true;
            }
        }

        return false;
    }

    /**
     * Walidacja adresu email przy użyciu wyrażenia regularnego
     */
    private boolean isEmailValid(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }

        // Podstawowe wyrażenie regularne do walidacji adresu email
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

        return email.matches(emailRegex);
    }


}
