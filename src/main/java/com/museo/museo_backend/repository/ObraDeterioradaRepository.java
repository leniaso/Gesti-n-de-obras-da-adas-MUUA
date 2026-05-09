package com.museo.museo_backend.repository;
import com.museo.museo_backend.entity.ObraDeteriorada;
import com.museo.museo_backend.entity.enums.EstadoObra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ObraDeterioradaRepository extends JpaRepository<ObraDeteriorada, Integer> {
    List<ObraDeteriorada> findByEstado(EstadoObra estado);
    List<ObraDeteriorada> findByObraId(Integer idObra);
}

