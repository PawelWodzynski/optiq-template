package com.auth.jwt.controller;

import com.auth.jwt.data.entity.app_data.ExampleData;
import com.auth.jwt.data.entity.auth.employee.Employee;
import com.auth.jwt.data.repository.app_data.AppDataRepository;
import com.auth.jwt.data.repository.auth.employee.EmployeeJpaRepository;
import com.auth.jwt.security.UserAuthProviderParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/example")
public class ExampleDataController {

    private final EmployeeJpaRepository employeeRepository;
    private final AppDataRepository appDataRepository;

    @Autowired
    public ExampleDataController(EmployeeJpaRepository employeeRepository,
                                 UserAuthProviderParam userAuthProviderParam,
                                 AppDataRepository appDataRepository) {
        this.employeeRepository = employeeRepository;
        this.appDataRepository = appDataRepository;
    }

    /**
     * Get the current authenticated user directly from the Security Context Principal.
     * @return Employee object or null if not authenticated or principal is not an Employee.
     */
    private Employee getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Employee) {
            // The principal should be the Employee object set by UserAuthProvider
            return (Employee) authentication.getPrincipal();
        }
        // Log or handle cases where authentication is null or principal is not Employee
        System.err.println("Could not retrieve Employee from Security Context. Authentication: " + authentication);
        return null;
    }

    /**
     * Create error response
     * @param message Error message
     * @return Error response
     */
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", message);
        return response;
    }

    /**
     * Create success response
     * @param message Success message
     * @param data Optional data to include in the response
     * @return Success response
     */
    private Map<String, Object> createSuccessResponse(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        if (data != null) {
            response.put("data", data);
        }
        return response;
    }

    /**
     * Test API authorization and fetch all example data
     * @param token JWT token (optional, not used directly as authentication is handled by JwtAuthFilter)
     * @return Success with example data or Unauthorized response
     */
    @GetMapping("/test")
    public ResponseEntity<?> testApiAuthorization(@RequestParam(required = false) String token) {
        // Use security context that was set by JwtAuthFilter
        Employee employee = getCurrentUser();
        if (employee == null) {
            // getCurrentUser failed, likely because the token was invalid or user not found during validation
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(createErrorResponse("Autoryzacja api nie działa - użytkownik nie uwierzytelniony"));
        }

        try {
            // Fetch all records from example_data table
            List<ExampleData> exampleDataList = appDataRepository.findAll();

            // Return success response with data
            return ResponseEntity.ok(createSuccessResponse(
                    "Autoryzacja api działa dla użytkownika: " + employee.getUserName(),
                    exampleDataList
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Błąd podczas pobierania danych: " + e.getMessage()));
        }
    }
}