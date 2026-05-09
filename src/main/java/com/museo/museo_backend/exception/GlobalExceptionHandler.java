package com.museo.museo_backend.exception;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String,String>> handleRuntime(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String,String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String,String>> handleDataIntegrity(DataIntegrityViolationException ex) {
        String mensaje = "Error de integridad en los datos.";
        String causa = ex.getRootCause() != null ? ex.getRootCause().getMessage() : "";
        if (causa.contains("email")) {
            mensaje = "Lo sentimos, este correo ya está registrado.";
        } else if (causa.contains("celular")) {
            mensaje = "Lo sentimos, este número de celular ya está registrado.";
        } else if (causa.contains("personal_museo_pkey") || causa.contains("obras_pkey") || causa.contains("pkey")) {
            mensaje = "Lo sentimos, ya existe un registro con ese ID.";
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", mensaje));
    }
}