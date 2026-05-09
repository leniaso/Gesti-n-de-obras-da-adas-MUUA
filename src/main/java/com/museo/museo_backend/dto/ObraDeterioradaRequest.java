package com.museo.museo_backend.dto;
import com.museo.museo_backend.entity.enums.EstadoObra;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ObraDeterioradaRequest {
    @NotNull(message="La obra es obligatoria") private Integer idObra;
    private Integer idPersonal;
    @NotBlank(message="La descripcion es obligatoria") private String descripcion;
    @NotNull(message="El estado es obligatorio") private EstadoObra estado;
    @NotNull(message="La fecha de identificacion es obligatoria") private LocalDate fechaIdentificacion;
}
