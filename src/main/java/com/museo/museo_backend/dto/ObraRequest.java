package com.museo.museo_backend.dto;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ObraRequest {
    @NotBlank(message="El titulo es obligatorio") private String titulo;
    private String autor;
    private LocalDate fechaCreacion;
    @NotNull(message="El tipo de obra es obligatorio") private Integer idTipo;
    @NotNull(message="La fecha de ultima revision es obligatoria") private LocalDate fechaUltimaRevision;
    private String ubicacion;
    private String linkDrive;
    @NotNull(message="La tecnica es obligatoria") private Integer idTecnica;
}
