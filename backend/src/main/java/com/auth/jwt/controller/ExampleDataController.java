package com.auth.jwt.controller;

import com.auth.jwt.data.entity.auth.employee.Employee;
import com.auth.jwt.data.repository.auth.employee.EmployeeJpaRepository;
import com.auth.jwt.security.UserAuthProviderParam; // This seems unused in the controller logic now, but keep the import for now.
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/example")
public class ExampleDataController {

    // Removed unused userAuthProviderParam field
    private final EmployeeJpaRepository employeeRepository; // Keep repository if needed elsewhere, though not for getCurrentUser anymore.

    @Autowired
    public ExampleDataController(EmployeeJpaRepository employeeRepository,
                                UserAuthProviderParam userAuthProviderParam) { // Keep constructor signature for Spring context
        this.employeeRepository = employeeRepository;
        // this.userAuthProviderParam = userAuthProviderParam; // Field removed
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
     * @return Success response
     */
    private Map<String, Object> createSuccessResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        return response;
    }


    /**
     * Test API authorization using the security context populated by JwtAuthFilter.
     * @param token JWT token (optional, not used directly as authentication is handled by JwtAuthFilter)
     * @return Success or Unauthorized response based on authentication status.
     */
    @GetMapping("/test")
    public ResponseEntity<?> testApiAuthorization(@RequestParam(required = false) String token) {
        // Use security context that was set by JwtAuthFilter
        Employee employee = getCurrentUser();
        if (employee == null) {
            // getCurrentUser failed, likely because the token was invalid or user not found during validation
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(createErrorResponse("Autoryzacja api nie działa - użytkownik nie uwierzytelniony")); // Updated error message
        }
        // User is authenticated, proceed.
        // Long employeeId = employee.getId(); // Can get ID if needed
        return ResponseEntity.ok(createSuccessResponse("Autoryzacja api działa dla użytkownika: " + employee.getUserName())); // Include username in success message
    }


}

