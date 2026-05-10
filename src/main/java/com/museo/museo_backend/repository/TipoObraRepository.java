package com.museo.museo_backend.repository;
import com.museo.museo_backend.entity.TipoObra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface TipoObraRepository extends JpaRepository<TipoObra, Integer> {}
