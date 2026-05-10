package com.museo.museo_backend.entity;
import com.museo.museo_backend.entity.enums.*;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
@Entity @Table(name="restauraciones")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Restauracion {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
    @Column(name="fecha_restauracion", nullable=false) private LocalDate fechaRestauracion;
    @Enumerated(EnumType.STRING) @Column(name="estado", nullable=false) private EstadoRestauracion estado;
    @Enumerated(EnumType.STRING) @Column(name="tipo_restauracion", nullable=false) private TiposRestauraciones tipoRestauracion;
    @Column(name="responsable") private String responsable;
    @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="id_personal_museo") private PersonalMuseo personalMuseo;
    @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="id_obra_deteriorada") private ObraDeteriorada obraDeteriorada;
    @Column(name="observaciones", columnDefinition="TEXT") private String observaciones;
}
