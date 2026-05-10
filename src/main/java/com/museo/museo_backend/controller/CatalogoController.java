package com.museo.museo_backend.controller;
import com.museo.museo_backend.entity.*;
import com.museo.museo_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/catalogos") @RequiredArgsConstructor
public class CatalogoController {
    private final TecnicaRepository tecnicaRepo;
    private final TipoObraRepository tipoObraRepo;
    @GetMapping("/tecnicas") public ResponseEntity<List<Tecnica>> tecnicas() { return ResponseEntity.ok(tecnicaRepo.findAll()); }
    @GetMapping("/tipos-obras") public ResponseEntity<List<TipoObra>> tiposObras() { return ResponseEntity.ok(tipoObraRepo.findAll()); }
}
