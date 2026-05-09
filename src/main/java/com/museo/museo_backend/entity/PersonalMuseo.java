package com.museo.museo_backend.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity @Table(name="personal_museo")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PersonalMuseo {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
    @Column(name="nombre", nullable=false, length=100) private String nombre;
    @Column(name="apellido", nullable=false) private String apellido;
    @Column(name="email", nullable=false, unique=true) private String email;
    @Column(name="celular", nullable=false) private String celular;
}
