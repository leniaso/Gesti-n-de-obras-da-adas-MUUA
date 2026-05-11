package com.museo.museo_backend.repository;
import com.museo.museo_backend.entity.ObraDeteriorada;
import com.museo.museo_backend.entity.enums.EstadoObra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ObraDeterioradaRepository extends JpaRepository<ObraDeteriorada, Integer> {
    List<ObraDeteriorada> findByEstado(EstadoObra estado);
    List<ObraDeteriorada> findByObraId(Integer idObra);

    @Query("SELECT od FROM ObraDeteriorada od " +
       "WHERE (:estado IS NULL OR od.estado = :estado) " +
       "AND (:autor IS NULL OR LOWER(od.obra.autor) LIKE LOWER(CONCAT('%',:autor,'%'))) " +
       "AND (:idTecnica IS NULL OR od.obra.tecnica.id = :idTecnica) " +
       "AND (:anio IS NULL OR EXTRACT(YEAR FROM od.obra.fechaCreacion) = :anio)")
        List<ObraDeteriorada> filtrarAvanzado(
        @Param("estado") EstadoObra estado,
        @Param("autor") String autor,
        @Param("idTecnica") Integer idTecnica,
        @Param("anio") Integer anio);
}