package com.museo.museo_backend.repository;
import com.museo.museo_backend.entity.Obra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ObraRepository extends JpaRepository<Obra, Integer> {
    List<Obra> findByAutorContainingIgnoreCase(String autor);
    List<Obra> findByTituloContainingIgnoreCase(String titulo);
    List<Obra> findByTecnicaId(Integer idTecnica);
    List<Obra> findByTipoId(Integer idTipo);
    @Query("SELECT o FROM Obra o WHERE EXTRACT(YEAR FROM o.fechaCreacion) = :anio")
    List<Obra> findByAnioCreacion(@Param("anio") int anio);
    @Query("SELECT o FROM Obra o WHERE " +
           "(:autor IS NULL OR LOWER(o.autor) LIKE LOWER(CONCAT('%',:autor,'%'))) AND " +
           "(:titulo IS NULL OR LOWER(o.titulo) LIKE LOWER(CONCAT('%',:titulo,'%'))) AND " +
           "(:idTecnica IS NULL OR o.tecnica.id = :idTecnica) AND " +
           "(:idTipo IS NULL OR o.tipo.id = :idTipo) AND " +
           "(:anio IS NULL OR EXTRACT(YEAR FROM o.fechaCreacion) = :anio)")
    List<Obra> busquedaAvanzada(@Param("autor") String autor, @Param("titulo") String titulo,
                                @Param("idTecnica") Integer idTecnica, @Param("idTipo") Integer idTipo,
                                @Param("anio") Integer anio);
}
