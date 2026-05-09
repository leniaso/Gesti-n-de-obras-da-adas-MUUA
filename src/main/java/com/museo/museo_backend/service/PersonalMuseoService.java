package com.museo.museo_backend.service;
import com.museo.museo_backend.dto.PersonalMuseoRequest;
import com.museo.museo_backend.entity.PersonalMuseo;
import com.museo.museo_backend.repository.PersonalMuseoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service @RequiredArgsConstructor
public class PersonalMuseoService {
    private final PersonalMuseoRepository repo;
    public List<PersonalMuseo> listarTodos() { return repo.findAll(); }
    public PersonalMuseo buscarPorId(Integer id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Personal no encontrado con id: " + id));
    }
    public PersonalMuseo crear(PersonalMuseoRequest r) {
        return repo.save(PersonalMuseo.builder().id(r.getId()).nombre(r.getNombre()).apellido(r.getApellido()).email(r.getEmail()).celular(r.getCelular()).build());
    }
    public PersonalMuseo editar(Integer id, PersonalMuseoRequest r) {
        PersonalMuseo p = buscarPorId(id);
        p.setNombre(r.getNombre()); p.setApellido(r.getApellido()); p.setEmail(r.getEmail()); p.setCelular(r.getCelular());
        return repo.save(p);
    }
}
