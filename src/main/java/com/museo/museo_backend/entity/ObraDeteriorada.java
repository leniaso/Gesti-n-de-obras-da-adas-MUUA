package com.museo.museo_backend.entity;
import com.museo.museo_backend.entity.enums.EstadoObra;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
@Entity @Table(name="obras_deterioradas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ObraDeteriorada {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
    @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="id_obra", nullable=false) private Obra obra;
    @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="id_personal") private PersonalMuseo personal;
    @Column(name="descripcion", nullable=false, columnDefinition="TEXT") private String descripcion;
    @Enumerated(EnumType.STRING) @Column(name="estado", nullable=false) private EstadoObra estado;
    @Column(name="fecha_identificacion", nullable=false) private LocalDate fechaIdentificacion;
}
