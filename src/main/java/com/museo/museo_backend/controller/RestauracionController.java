package com.museo.museo_backend.controller;
import com.museo.museo_backend.dto.RestauracionRequest;
import com.museo.museo_backend.entity.Restauracion;
import com.museo.museo_backend.service.RestauracionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
@RestController @RequestMapping("/api/restauraciones") @RequiredArgsConstructor
public class RestauracionController {
    private final RestauracionService service;
    @GetMapping public ResponseEntity<List<Restauracion>> listarTodas() { return ResponseEntity.ok(service.listarTodas()); }
    @GetMapping("/{id}") public ResponseEntity<Restauracion> buscarPorId(@PathVariable Integer id) { return ResponseEntity.ok(service.buscarPorId(id)); }
    @GetMapping("/por-obra-deteriorada/{id}") public ResponseEntity<List<Restauracion>> porObraDeteriorada(@PathVariable Integer id) { return ResponseEntity.ok(service.filtrarPorObraDeteriorada(id)); }
    @GetMapping("/por-obra/{idObra}") public ResponseEntity<List<Restauracion>> porObra(@PathVariable Integer idObra) { return ResponseEntity.ok(service.filtrarPorObra(idObra)); }
    @GetMapping("/filtrar-fecha") public ResponseEntity<List<Restauracion>> filtrarFecha(
            @RequestParam @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate hasta) {
        return ResponseEntity.ok(service.filtrarPorRangoFecha(desde, hasta));
    }
    @PostMapping public ResponseEntity<Restauracion> crear(@Valid @RequestBody RestauracionRequest req) { return ResponseEntity.ok(service.crear(req)); }
    @PutMapping("/{id}") public ResponseEntity<Restauracion> editar(@PathVariable Integer id, @Valid @RequestBody RestauracionRequest req) { return ResponseEntity.ok(service.editar(id, req)); }
}