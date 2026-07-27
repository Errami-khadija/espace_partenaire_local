package com.espacepartenairelocal.backend.service;

import com.espacepartenairelocal.backend.entity.Announcement;
import com.espacepartenairelocal.backend.exception.ResourceNotFoundException;
import com.espacepartenairelocal.backend.repository.AnnouncementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    // =========================
    // Get all announcements
    // =========================
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    // =========================
    // Create announcement
    // =========================
    public Announcement createAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    // =========================
    // Get announcement by ID
    // =========================
    public Announcement getAnnouncementById(Long id) {
        return announcementRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Announcement not found with id: " + id));
    }

    // =========================
    // Update announcement
    // =========================
    public Announcement updateAnnouncement(Long id, Announcement updatedAnnouncement) {

        Announcement existingAnnouncement = announcementRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Announcement not found with id: " + id));

        // Common fields
        existingAnnouncement.setTitle(updatedAnnouncement.getTitle());
        existingAnnouncement.setDescription(updatedAnnouncement.getDescription());
        existingAnnouncement.setType(updatedAnnouncement.getType());
        existingAnnouncement.setSector(updatedAnnouncement.getSector());
        existingAnnouncement.setRegion(updatedAnnouncement.getRegion());
        existingAnnouncement.setContact(updatedAnnouncement.getContact());

        existingAnnouncement.setStatus(updatedAnnouncement.getStatus());
        existingAnnouncement.setViews(updatedAnnouncement.getViews());
        existingAnnouncement.setAttachments(updatedAnnouncement.getAttachments());
        existingAnnouncement.setRejectionReason(updatedAnnouncement.getRejectionReason());

        // Investment
        existingAnnouncement.setAmountSought(updatedAnnouncement.getAmountSought());
        existingAnnouncement.setEstimatedROI(updatedAnnouncement.getEstimatedROI());
        existingAnnouncement.setProjectDuration(updatedAnnouncement.getProjectDuration());

        // Collaboration
        existingAnnouncement.setCollaborationType(updatedAnnouncement.getCollaborationType());
        existingAnnouncement.setRequiredProfile(updatedAnnouncement.getRequiredProfile());

        // Tourism
        existingAnnouncement.setTourismProjectType(updatedAnnouncement.getTourismProjectType());
        existingAnnouncement.setCapacity(updatedAnnouncement.getCapacity());

        return announcementRepository.save(existingAnnouncement);
    }

    // =========================
    // Delete announcement
    // =========================
    public void deleteAnnouncement(Long id) {

        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Announcement not found with id: " + id));

        announcementRepository.delete(announcement);
    }
}