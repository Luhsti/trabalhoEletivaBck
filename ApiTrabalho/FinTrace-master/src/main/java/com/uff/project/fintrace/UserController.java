package com.uff.project.fintrace;

import com.uff.project.fintrace.repository.UserRepository;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public String hello(){
        return "Hello World";
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user)
    {
        User savedUser = userRepository.save(user);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", "Usuário registrado com sucesso!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> logUser(@RequestBody User loginUser)
    {
        Optional<User> user = userRepository.findByUsernameAndPassword(loginUser.getUsername(), loginUser.getPassword());
        Map<String, Object> response = new HashMap<>();

        if(user.isPresent())
        {
            response.put("success", true);
            response.put("data", "Usuário logado com sucesso!");
            return ResponseEntity.ok(response);
        }
        else
            response.put("success", false);
            response.put("data", "Usuário inválido");
            return ResponseEntity.badRequest().body(response);

    }
}
