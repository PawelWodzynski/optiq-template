package com.auth.jwt.service;

import com.auth.jwt.data.dto.authorization.CredentialsDto;
import com.auth.jwt.data.dto.employee.RegisterEmployeeDto;
import com.auth.jwt.data.entity.auth.employee.Employee;
import com.auth.jwt.data.repository.auth.employee.EmployeeJpaRepository;
import com.auth.jwt.exception.RegistrationException; // Assuming a custom exception for registration errors
import com.auth.jwt.exception.AuthenticationException; // Assuming a custom exception for login errors
import com.auth.jwt.security.UserAuthProvider;
import com.auth.jwt.util.ValidationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        // Implementation Note: This method will contain the logic currently in AuthController's login method.
        // It will find the user, match the password, and generate a token.
        // If user not found or password mismatch, it throws AuthenticationException.
        
        // Placeholder for outline:
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
        // Implementation Note: This method will contain the logic currently in AuthController's register method.
        // It will perform validation, check for existing user/email, save the new user, and generate a token.
        // Throws RegistrationException for specific errors.

        // 1. Validate Password
        if (!validationUtil.isPasswordValid(registerEmployeeDto.getPassword())) {
            throw new RegistrationException("Hasło musi spełniać określone warunki złożoności."); // More specific message can be added
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

        // 5. Create and save new user (Actual saving logic)
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
}

