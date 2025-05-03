package com.auth.jwt.service;

import com.auth.jwt.data.entity.app_data.ExampleData;
import com.auth.jwt.data.repository.app_data.AppDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExampleDataService {

    private final AppDataRepository appDataRepository;

    @Autowired
    public ExampleDataService(AppDataRepository appDataRepository) {
        this.appDataRepository = appDataRepository;
    }

    /**
     * Fetches all ExampleData records from the repository.
     * This method encapsulates the database interaction logic.
     * @return List of ExampleData objects.
     * @throws RuntimeException if there is an error during data fetching.
     */
    public List<ExampleData> getAllExampleData() {
        // Implementation Note: This method will contain the logic currently in the controller:
        // try {
        //     return appDataRepository.findAll();
        // } catch (Exception e) {
        //     // Log the exception
        //     throw new RuntimeException("Error fetching ExampleData", e);
        // }
        // For the outline, we just declare the method signature and responsibility.
        // Actual implementation will be done later if requested.
        return null; // Placeholder for outline
    }
}

