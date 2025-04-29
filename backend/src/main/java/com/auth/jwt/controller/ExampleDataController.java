package com.auth.jwt.controller;



import com.auth.jwt.data.entity.auth.employee.Employee;
import com.auth.jwt.data.repository.auth.employee.EmployeeJpaRepository;
import com.auth.jwt.security.UserAuthProviderParam;
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

    private final UserAuthProviderParam userAuthProviderParam;
    private final EmployeeJpaRepository employeeRepository;

    @Autowired
    public ExampleDataController(EmployeeJpaRepository employeeRepository,
                                UserAuthProviderParam userAuthProviderParam) {
        this.employeeRepository = employeeRepository;
        this.userAuthProviderParam = userAuthProviderParam;
    }

    /**
     * Get the current authenticated user
     * @return Employee object or null
     */
    private Employee getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getName() != null) {
            String username = authentication.getName();
            // Sprawdź, czy nazwa użytkownika nie jest obiektem Employee
            if (username.contains("Employee{")) {
                // Wyciągnij userName z obiektu Employee
                int start = username.indexOf("userName='") + 10;
                int end = username.indexOf("'", start);
                if (start > 0 && end > start) {
                    username = username.substring(start, end);
                }
            }
            return employeeRepository.findByLogin(username);
        }
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
     * Get assessment summary
     * @param token JWT token (optional, not used directly as authentication is handled by JwtAuthFilter)
     * @return Summary of assessments
     */
    @GetMapping("/test")
    public ResponseEntity<?> testApiAuthorization(@RequestParam(required = false) String token) {
        // Use security context that was set by JwtAuthFilter
        Employee employee = getCurrentUser();
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(createErrorResponse("Autoryzacja api nie działa"));
        }
        Long employeeId = employee.getId();
        return ResponseEntity.ok(createSuccessResponse("Autoryzacja api działa"));
    }


}
