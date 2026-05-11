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
    public PersonalMuseo editarConId(Integer idActual, PersonalMuseoRequest r) {
    PersonalMuseo p = buscarPorId(idActual);

    // Si el id cambió, verificar que no tenga registros asociados antes de intentar
    if (!idActual.equals(r.getId())) {
        repo.deleteById(idActual); // esto fallará con excepción si tiene FK
        PersonalMuseo nuevo = PersonalMuseo.builder()
                .id(r.getId())
                .nombre(r.getNombre())
                .apellido(r.getApellido())
                .email(r.getEmail())
                .celular(r.getCelular())
                .build();
        return repo.save(nuevo);
    }

    // Si el id no cambió, editar normal sin borrar
    p.setNombre(r.getNombre());
    p.setApellido(r.getApellido());
    p.setEmail(r.getEmail());
    p.setCelular(r.getCelular());
    return repo.save(p);
}
}
