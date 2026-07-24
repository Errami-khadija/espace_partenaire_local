package com.espacepartenairelocal.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Backend Espace Partenaire Local is running correctly!";
    }

    @GetMapping("/api/test")
    public String test() {
        return "API works correctly!";
    }
}