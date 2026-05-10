package com.museo.museo_backend.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
@Entity @Table(name="obras")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Obra {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
    @Column(name="titulo", nullable=false) private String titulo;
    @Column(name="autor") private String autor;
    @Column(name="fecha_creacion") private LocalDate fechaCreacion;
    @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="id_tipo", nullable=false) private TipoObra tipo;
    @Column(name="fecha_ultima_revision", nullable=false) private LocalDate fechaUltimaRevision;
    @Column(name="ubicacion") private String ubicacion;
    @Column(name="link_drive") private String linkDrive;
    @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="id_tecnica", nullable=false) private Tecnica tecnica;
}
