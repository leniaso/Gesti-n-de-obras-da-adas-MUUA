package com.museo.museo_backend.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity @Table(name="tecnicas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Tecnica {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
    @Column(name="nombre", nullable=false, length=100) private String nombre;
}
