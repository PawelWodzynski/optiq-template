package com.auth.jwt.controller;

import com.auth.jwt.data.entity.app_data.ExampleData;
import com.auth.jwt.data.entity.auth.employee.Employee;
import com.auth.jwt.service.ExampleDataService;
import com.auth.jwt.util.AuthUtil;
import com.auth.jwt.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/example")
public class ExampleDataController {

    // Dependencies injected via constructor
    private final ExampleDataService exampleDataService;
    private final AuthUtil authUtil;
    private final ResponseUtil responseUtil;

    @Autowired
    public ExampleDataController(ExampleDataService exampleDataService,
                                 AuthUtil authUtil,
                                 ResponseUtil responseUtil) {
        this.exampleDataService = exampleDataService;
        this.authUtil = authUtil;
        this.responseUtil = responseUtil;
    }

    /**
     * Test API authorization and fetch all example data.
     * This controller method now delegates logic to helper utils and services.
     * @param token JWT token (optional, authentication is primarily handled by filter)
     * @return Success with example data or Unauthorized/Error response.
     */
    @GetMapping("/test")
    public ResponseEntity<?> testApiAuthorization(@RequestParam(required = false) String token) {
        // 1. Get current user using AuthUtil
        Employee employee = authUtil.getCurrentUser();
        if (employee == null) {
            // 2. Create error response using ResponseUtil
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(responseUtil.createErrorResponse("Autoryzacja api nie działa - użytkownik nie uwierzytelniony"));
        }

        try {
            // 3. Fetch data using ExampleDataService
            List<ExampleData> exampleDataList = exampleDataService.getAllExampleData();

            // 4. Create success response using ResponseUtil
            return ResponseEntity.ok(responseUtil.createSuccessResponse(
                    "Autoryzacja api działa dla użytkownika: " + employee.getUserName(),
                    exampleDataList
            ));
        } catch (Exception e) {
            // 5. Handle potential exceptions from the service layer and create error response
            // Consider more specific exception handling based on service layer exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(responseUtil.createErrorResponse("Błąd podczas pobierania danych: " + e.getMessage()));
        }
    }

    // Note: Original private helper methods (getCurrentUser, createErrorResponse, createSuccessResponse)
    // have been removed as their logic is now in AuthUtil and ResponseUtil.
}

