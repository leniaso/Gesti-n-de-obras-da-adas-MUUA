package com.museo.museo_backend.controller;

import com.museo.museo_backend.dto.ObraDeterioradaRequest;
import com.museo.museo_backend.entity.ObraDeteriorada;
import com.museo.museo_backend.entity.enums.EstadoObra;
import com.museo.museo_backend.service.ObraDeterioradaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/obras-deterioradas")
@RequiredArgsConstructor
public class ObraDeterioradaController {

    private final ObraDeterioradaService service;

    @GetMapping
    public ResponseEntity<List<ObraDeteriorada>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ObraDeteriorada> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<ObraDeteriorada>> filtrar(
            @RequestParam(required = false) EstadoObra estado,
            @RequestParam(required = false) String autor,
            @RequestParam(required = false) Integer idTecnica,
            @RequestParam(required = false) Integer anio) {
        return ResponseEntity.ok(service.filtrarAvanzado(estado, autor, idTecnica, anio));
    }

    @PostMapping
    public ResponseEntity<ObraDeteriorada> reportar(@Valid @RequestBody ObraDeterioradaRequest req) {
        return ResponseEntity.ok(service.reportar(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ObraDeteriorada> editar(@PathVariable Integer id,
            @Valid @RequestBody ObraDeterioradaRequest req) {
        return ResponseEntity.ok(service.editar(id, req));
    }

    @GetMapping("/sin-restauracion-finalizada")
    public ResponseEntity<List<ObraDeteriorada>> sinRestauracionFinalizada() {
        return ResponseEntity.ok(service.listarSinRestauracionFinalizada());
    }
}