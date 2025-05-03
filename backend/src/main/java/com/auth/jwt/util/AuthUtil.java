package com.auth.jwt.util;

import com.auth.jwt.data.entity.auth.employee.Employee;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component // Mark as a Spring component to be injectable
public class AuthUtil {

    /**
     * Get the current authenticated user directly from the Security Context Principal.
     * @return Employee object or null if not authenticated or principal is not an Employee.
     */
    public Employee getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Employee) {
            // The principal should be the Employee object set by UserAuthProvider
            return (Employee) authentication.getPrincipal();
        }
        // Log or handle cases where authentication is null or principal is not Employee
        System.err.println("AuthUtil: Could not retrieve Employee from Security Context. Authentication: " + authentication);
        return null;
    }
}

