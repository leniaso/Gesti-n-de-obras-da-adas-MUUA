package com.museo.museo_backend.dto;
import jakarta.validation.constraints.*;
import lombok.*;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PersonalMuseoRequest {
    @NotBlank(message="El nombre es obligatorio") private String nombre;
    @NotBlank(message="El apellido es obligatorio") private String apellido;
    @NotBlank @Email(message="Email invalido") private String email;
    @NotBlank(message="El celular es obligatorio") private String celular;
}
