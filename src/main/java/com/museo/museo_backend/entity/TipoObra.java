package com.museo.museo_backend.entity;
import com.museo.museo_backend.entity.enums.Materiales;
import jakarta.persistence.*;
import lombok.*;
@Entity @Table(name="tipos_obras")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TipoObra {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
    @Column(name="tipo_obra", nullable=false, length=100) private String tipoObra;
    @Enumerated(EnumType.STRING) @Column(name="material", nullable=false) private Materiales material;
}
