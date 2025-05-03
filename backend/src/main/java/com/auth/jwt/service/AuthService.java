package com.auth.jwt.service;

import com.auth.jwt.data.dto.authorization.CredentialsDto;
import com.auth.jwt.data.dto.employee.RegisterEmployeeDto;
import com.auth.jwt.data.entity.auth.employee.Employee;
import com.auth.jwt.data.entity.auth.employee.Role; // Import Role entity
import com.auth.jwt.data.repository.auth.employee.EmployeeJpaRepository;
import com.auth.jwt.exception.RegistrationException;
import com.auth.jwt.exception.AuthenticationException;
import com.auth.jwt.security.UserAuthProvider;
import com.auth.jwt.util.ValidationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication; // Import Authentication
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections; // Import Collections
import java.util.HashMap; // Import HashMap
import java.util.List; // Import List
import java.util.Map; // Import Map
import java.util.Optional; // Import Optional
import java.util.stream.Collectors; // Import Collectors

@Service
@RequiredArgsConstructor // Lombok annotation for constructor injection
public class AuthService {

    private final EmployeeJpaRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserAuthProvider userAuthProvider;
    private final ValidationUtil validationUtil;

    /**
     * Authenticates a user based on provided credentials.
     * @param credentialsDto DTO containing login and password.
     * @return JWT token if authentication is successful.
     * @throws AuthenticationException if authentication fails (user not found, wrong password).
     */
    public String login(CredentialsDto credentialsDto) throws AuthenticationException {
        Employee employee = employeeRepository.findByLogin(credentialsDto.getLogin());
        if (employee == null || !passwordEncoder.matches(String.valueOf(credentialsDto.getPassword()), employee.getPassword())) {
            throw new AuthenticationException("Nieprawidłowy login lub hasło");
        }
        return userAuthProvider.createToken(employee.getUserName());
    }

    /**
     * Registers a new employee.
     * @param registerEmployeeDto DTO containing registration details.
     * @return JWT token for the newly registered user.
     * @throws RegistrationException if registration fails (validation errors, user/email exists).
     */
    public String register(RegisterEmployeeDto registerEmployeeDto) throws RegistrationException {
        // 1. Validate Password
        if (!validationUtil.isPasswordValid(registerEmployeeDto.getPassword())) {
            throw new RegistrationException("Hasło musi spełniać określone warunki złożoności.");
        }

        // 2. Validate Email
        if (!validationUtil.isEmailValid(registerEmployeeDto.getEmail())) {
            throw new RegistrationException("Podany adres email jest nieprawidłowy.");
        }

        // 3. Check if user already exists
        if (employeeRepository.findByLogin(registerEmployeeDto.getUserName()) != null) {
            throw new RegistrationException("Użytkownik o podanym loginie już istnieje.");
        }

        // 4. Check if email already exists
        if (employeeRepository.findByEmail(registerEmployeeDto.getEmail()) != null) {
            throw new RegistrationException("Podany adres email jest już zarejestrowany.");
        }

        // 5. Create and save new user
        Employee newEmployee = new Employee();
        newEmployee.setUserName(registerEmployeeDto.getUserName());
        newEmployee.setPassword(passwordEncoder.encode(registerEmployeeDto.getPassword()));
        newEmployee.setFirstName(registerEmployeeDto.getFirstName());
        newEmployee.setLastName(registerEmployeeDto.getLastName());
        newEmployee.setEmail(registerEmployeeDto.getEmail());
        employeeRepository.save(newEmployee);

        // 6. Generate token
        return userAuthProvider.createToken(newEmployee.getUserName());
    }

    /**
     * Validates a JWT token and retrieves the user's roles.
     * @param token The JWT token string.
     * @return A Map containing token validity (boolean) and roles (List<String> or empty list).
     */
    public Map<String, Object> validateTokenAndGetRoles(String token) { // Renamed method for clarity
        Map<String, Object> result = new HashMap<>();
        try {
            Authentication auth = userAuthProvider.validateToken(token);
            // Token is valid, now get the user and roles
            if (auth.getPrincipal() instanceof Employee) {
                Employee employee = (Employee) auth.getPrincipal();
                result.put("tokenValidity", true);
                // Get all role names, return empty list if none
                List<String> roleNames = Optional.ofNullable(employee.getRoles())
                                               .orElse(Collections.emptyList()) // Use empty list if roles collection is null
                                               .stream()
                                               .map(Role::getName)
                                               .collect(Collectors.toList());
                result.put("roles", roleNames); // Ensure the key is "roles"
            } else {
                // Principal is not an Employee instance (should not happen with current setup)
                result.put("tokenValidity", false);
                result.put("roles", Collections.emptyList()); // Ensure the key is "roles"
            }
        } catch (Exception e) {
            // Token validation failed (e.g., expired, invalid signature)
            result.put("tokenValidity", false);
            result.put("roles", Collections.emptyList()); // Ensure the key is "roles"
        }
        return result;
    }
}

