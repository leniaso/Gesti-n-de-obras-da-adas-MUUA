package com.museo.museo_backend.service;
import com.museo.museo_backend.dto.RestauracionRequest;
import com.museo.museo_backend.entity.*;
import com.museo.museo_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
@Service @RequiredArgsConstructor
public class RestauracionService {
    private final RestauracionRepository repo;
    private final ObraDeterioradaRepository odRepo;
    private final PersonalMuseoRepository personalRepo;
    public List<Restauracion> listarTodas() { return repo.findAll(); }
    public Restauracion buscarPorId(Integer id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Restauracion no encontrada con id: " + id));
    }
    public List<Restauracion> filtrarPorObraDeteriorada(Integer id) { return repo.findByObraDeterioradaId(id); }
    public List<Restauracion> filtrarPorRangoFecha(LocalDate desde, LocalDate hasta) { return repo.findByRangoFecha(desde, hasta); }
    public List<Restauracion> filtrarPorObra(Integer idObra) { return repo.findByObraId(idObra); }
    private PersonalMuseo resolvePersonal(Integer id) {
        if (id == null) return null;
        return personalRepo.findById(id).orElseThrow(() -> new RuntimeException("Personal no encontrado"));
    }
    public Restauracion crear(RestauracionRequest r) {
        ObraDeteriorada od = odRepo.findById(r.getIdObraDeteriorada()).orElseThrow(() -> new RuntimeException("Obra deteriorada no encontrada"));
        return repo.save(Restauracion.builder().fechaRestauracion(r.getFechaRestauracion()).estado(r.getEstado())
                .tipoRestauracion(r.getTipoRestauracion()).responsable(r.getResponsable())
                .personalMuseo(resolvePersonal(r.getIdPersonalMuseo())).obraDeteriorada(od).observaciones(r.getObservaciones()).build());
    }
    public Restauracion editar(Integer id, RestauracionRequest r) {
        Restauracion res = buscarPorId(id);
        ObraDeteriorada od = odRepo.findById(r.getIdObraDeteriorada()).orElseThrow(() -> new RuntimeException("Obra deteriorada no encontrada"));
        res.setFechaRestauracion(r.getFechaRestauracion()); res.setEstado(r.getEstado());
        res.setTipoRestauracion(r.getTipoRestauracion()); res.setResponsable(r.getResponsable());
        res.setPersonalMuseo(resolvePersonal(r.getIdPersonalMuseo())); res.setObraDeteriorada(od);
        res.setObservaciones(r.getObservaciones());
        return repo.save(res);
    }
}