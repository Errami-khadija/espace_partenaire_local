package com.espacepartenairelocal.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.espacepartenairelocal.backend.entity.PartnerProfile;
import com.espacepartenairelocal.backend.service.PartnerProfileService;

import jakarta.validation.Valid;
    
    @RestController
@RequestMapping("/api/local-partner/profil")
public class PartnerProfileController {

    private final PartnerProfileService profileService;

    public PartnerProfileController(PartnerProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<PartnerProfile> getProfile() {

        return ResponseEntity.ok(profileService.getProfile());

    }

    @PutMapping
    public ResponseEntity<PartnerProfile> updateProfile(
            @RequestBody @Valid PartnerProfile profile) {

        return ResponseEntity.ok(
                profileService.updateProfile(profile)
        );

    }

}

