package com.espacepartenairelocal.backend.controller;

import com.espacepartenairelocal.backend.entity.Announcement;
import com.espacepartenairelocal.backend.service.AnnouncementService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping("/api/local-partner/annonces")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }

    @PostMapping
public ResponseEntity<Announcement> createAnnouncement(@RequestBody @Valid Announcement announcement) {
    Announcement created = announcementService.createAnnouncement(announcement);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
}
@GetMapping("/{id}")
public ResponseEntity<Announcement> getAnnouncementById(@PathVariable Long id) {
    Announcement announcement = announcementService.getAnnouncementById(id);
    return ResponseEntity.ok(announcement);
}

@PutMapping("/{id}")
public ResponseEntity<Announcement> updateAnnouncement(
        @PathVariable Long id,
        @Valid @RequestBody Announcement announcement) {

    Announcement updated = announcementService.updateAnnouncement(id, announcement);
    return ResponseEntity.ok(updated);
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {

    announcementService.deleteAnnouncement(id);

    return ResponseEntity.noContent().build();
}
@PatchMapping("/{id}/archiver")
public ResponseEntity<Announcement> archiveAnnouncement(@PathVariable Long id) {

    Announcement archived = announcementService.archiveAnnouncement(id);

    return ResponseEntity.ok(archived);
}
}