package com.museo.museo_backend.dto;
import com.museo.museo_backend.entity.enums.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RestauracionRequest {
    @NotNull(message="La fecha de restauracion es obligatoria") private LocalDate fechaRestauracion;
    @NotNull(message="El estado es obligatorio") private EstadoRestauracion estado;
    @NotNull(message="El tipo de restauracion es obligatorio") private TiposRestauraciones tipoRestauracion;
    private String responsable;
    private Integer idPersonalMuseo;
    @NotNull(message="La obra deteriorada es obligatoria") private Integer idObraDeteriorada;
    private String observaciones;
}
