package com.museo.museo_backend.repository;
import com.museo.museo_backend.entity.Restauracion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
@Repository
public interface RestauracionRepository extends JpaRepository<Restauracion, Integer> {
    List<Restauracion> findByObraDeterioradaId(Integer idObraDeteriorada);
    @Query("SELECT r FROM Restauracion r WHERE r.fechaRestauracion BETWEEN :desde AND :hasta")
    List<Restauracion> findByRangoFecha(@Param("desde") LocalDate desde, @Param("hasta") LocalDate hasta);
    @Query("SELECT r FROM Restauracion r WHERE r.obraDeteriorada.obra.id = :idObra")
    List<Restauracion> findByObraId(@Param("idObra") Integer idObra);
}
