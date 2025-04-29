package com.auth.jwt.config;

import com.auth.jwt.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    // Define permitted paths directly here or load from properties
    private static final String[] PERMITTED_PATHS = {
            "/login",
            "/register",
            "/swagger-ui/**", // Allow access to swagger UI resources
            "/v3/api-docs/**", // Allow access to OpenAPI docs
            "/swagger-resources/**" // Allow access to swagger resources
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF protection as we are using stateless JWT authentication
            .csrf(AbstractHttpConfigurer::disable)
            // Add the custom JWT authentication filter before the standard UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            // Configure session management to be stateless
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Configure authorization rules
            .authorizeHttpRequests(auth -> auth
                // Permit access to specific paths without authentication
                .requestMatchers(PERMITTED_PATHS).permitAll()
                // Permit OPTIONS requests (often used for CORS preflight)
                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                // Require authentication for any other request
                .anyRequest().authenticated()
            );

        return http.build();
    }
}

