package com.museo.museo_backend.service;
import com.museo.museo_backend.dto.ObraDeterioradaRequest;
import com.museo.museo_backend.entity.*;
import com.museo.museo_backend.entity.enums.EstadoObra;
import com.museo.museo_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service @RequiredArgsConstructor
public class ObraDeterioradaService {
    private final ObraDeterioradaRepository repo;
    private final ObraRepository obraRepository;
    private final PersonalMuseoRepository personalRepo;
    public List<ObraDeteriorada> listarTodas() { return repo.findAll(); }
    public ObraDeteriorada buscarPorId(Integer id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Obra deteriorada no encontrada con id: " + id));
    }
    public List<ObraDeteriorada> filtrarPorEstado(EstadoObra estado) { return repo.findByEstado(estado); }
    private PersonalMuseo resolvePersonal(Integer id) {
        if (id == null) return null;
        return personalRepo.findById(id).orElseThrow(() -> new RuntimeException("Personal no encontrado"));
    }
    public ObraDeteriorada reportar(ObraDeterioradaRequest r) {
        Obra obra = obraRepository.findById(r.getIdObra()).orElseThrow(() -> new RuntimeException("Obra no encontrada"));
        return repo.save(ObraDeteriorada.builder().obra(obra).personal(resolvePersonal(r.getIdPersonal()))
                .descripcion(r.getDescripcion()).estado(r.getEstado()).fechaIdentificacion(r.getFechaIdentificacion()).build());
    }
    public ObraDeteriorada editar(Integer id, ObraDeterioradaRequest r) {
        ObraDeteriorada od = buscarPorId(id);
        Obra obra = obraRepository.findById(r.getIdObra()).orElseThrow(() -> new RuntimeException("Obra no encontrada"));
        od.setObra(obra); od.setPersonal(resolvePersonal(r.getIdPersonal())); od.setDescripcion(r.getDescripcion());
        od.setEstado(r.getEstado()); od.setFechaIdentificacion(r.getFechaIdentificacion());
        return repo.save(od);
    }
    // en ObraDeterioradaService.java
    public List<ObraDeteriorada> filtrarAvanzado(EstadoObra estado, String autor, Integer idTecnica, Integer anio) {
        String estadoStr = estado != null ? estado.name() : null;
        return repo.filtrarAvanzado(estadoStr, autor, idTecnica, anio);
    }
}