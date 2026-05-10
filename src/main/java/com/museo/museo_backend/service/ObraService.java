package com.museo.museo_backend.service;
import com.museo.museo_backend.dto.ObraRequest;
import com.museo.museo_backend.entity.*;
import com.museo.museo_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service @RequiredArgsConstructor
public class ObraService {
    private final ObraRepository obraRepository;
    private final TecnicaRepository tecnicaRepository;
    private final TipoObraRepository tipoObraRepository;
    public List<Obra> listarTodas() { return obraRepository.findAll(); }
    public Obra buscarPorId(Integer id) {
        return obraRepository.findById(id).orElseThrow(() -> new RuntimeException("Obra no encontrada con id: " + id));
    }
    public Obra crear(ObraRequest r) {
        Tecnica tecnica = tecnicaRepository.findById(r.getIdTecnica()).orElseThrow(() -> new RuntimeException("Tecnica no encontrada"));
        TipoObra tipo = tipoObraRepository.findById(r.getIdTipo()).orElseThrow(() -> new RuntimeException("Tipo de obra no encontrado"));
        return obraRepository.save(Obra.builder().titulo(r.getTitulo()).autor(r.getAutor())
                .fechaCreacion(r.getFechaCreacion()).tipo(tipo).fechaUltimaRevision(r.getFechaUltimaRevision())
                .ubicacion(r.getUbicacion()).linkDrive(r.getLinkDrive()).tecnica(tecnica).build());
    }
    public Obra editar(Integer id, ObraRequest r) {
        Obra obra = buscarPorId(id);
        Tecnica tecnica = tecnicaRepository.findById(r.getIdTecnica()).orElseThrow(() -> new RuntimeException("Tecnica no encontrada"));
        TipoObra tipo = tipoObraRepository.findById(r.getIdTipo()).orElseThrow(() -> new RuntimeException("Tipo no encontrado"));
        obra.setTitulo(r.getTitulo()); obra.setAutor(r.getAutor()); obra.setFechaCreacion(r.getFechaCreacion());
        obra.setTipo(tipo); obra.setFechaUltimaRevision(r.getFechaUltimaRevision());
        obra.setUbicacion(r.getUbicacion()); obra.setLinkDrive(r.getLinkDrive()); obra.setTecnica(tecnica);
        return obraRepository.save(obra);
    }
    public List<Obra> busquedaAvanzada(String autor, String titulo, Integer idTecnica, Integer idTipo, Integer anio) {
        return obraRepository.busquedaAvanzada(autor, titulo, idTecnica, idTipo, anio);
    }
}
