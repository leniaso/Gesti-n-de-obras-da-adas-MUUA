package com.museo.museo_backend.repository;
import com.museo.museo_backend.entity.Tecnica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface TecnicaRepository extends JpaRepository<Tecnica, Integer> {}
