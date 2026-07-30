package com.espacepartenairelocal.backend.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

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

 @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<PartnerProfile> updateProfile(
        @RequestPart("profile") PartnerProfile profile,
        @RequestPart(value = "logo", required = false) MultipartFile logo
) throws IOException {

    return ResponseEntity.ok(
        profileService.updateProfile(profile, logo)
    );
}
}

