package com.auth.jwt.data.dto.employee;

import lombok.Data;

@Data
public class RegisterEmployeeDto {
    private String userName;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
}
