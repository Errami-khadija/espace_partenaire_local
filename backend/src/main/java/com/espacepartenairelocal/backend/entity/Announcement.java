package com.espacepartenairelocal.backend.entity;

import com.espacepartenairelocal.backend.enums.AnnouncementStatus;
import com.espacepartenairelocal.backend.enums.AnnouncementType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "announcements")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // Common Fields
    // =========================

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Description is required")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Announcement type is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnnouncementType type;

    @NotBlank(message = "Sector is required")
    @Column(nullable = false)
    private String sector;

    @NotBlank(message = "Region is required")
    @Column(nullable = false)
    private String region;

    @NotBlank(message = "Contact is required")
    @Column(nullable = false)
    private String contact;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnnouncementStatus status = AnnouncementStatus.draft;

    @Column(nullable = false)
    private Integer views = 0;

    @ElementCollection
    @CollectionTable(
            name = "announcement_attachments",
            joinColumns = @JoinColumn(name = "announcement_id")
    )
    @Column(name = "attachment")
    private List<String> attachments = new ArrayList<>();

    private String rejectionReason;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // =========================
    // Investment Fields
    // =========================

    @PositiveOrZero
    private BigDecimal amountSought;

    @PositiveOrZero
    private Double estimatedROI;

    @PositiveOrZero
    private Integer projectDuration;

    // =========================
    // Collaboration Fields
    // =========================

    private String collaborationType;

    private String requiredProfile;

    // =========================
    // Tourism Fields
    // =========================

    private String tourismProjectType;

    @PositiveOrZero
    private Integer capacity;

    // =========================
    // Automatic Dates
    // =========================

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // =========================
    // Getters & Setters
    // =========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AnnouncementType getType() {
        return type;
    }

    public void setType(AnnouncementType type) {
        this.type = type;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public AnnouncementStatus getStatus() {
        return status;
    }

    public void setStatus(AnnouncementStatus status) {
        this.status = status;
    }

    public Integer getViews() {
        return views;
    }

    public void setViews(Integer views) {
        this.views = views;
    }

    public List<String> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<String> attachments) {
        this.attachments = attachments;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public BigDecimal getAmountSought() {
        return amountSought;
    }

    public void setAmountSought(BigDecimal amountSought) {
        this.amountSought = amountSought;
    }

    public Double getEstimatedROI() {
        return estimatedROI;
    }

    public void setEstimatedROI(Double estimatedROI) {
        this.estimatedROI = estimatedROI;
    }

    public Integer getProjectDuration() {
        return projectDuration;
    }

    public void setProjectDuration(Integer projectDuration) {
        this.projectDuration = projectDuration;
    }

    public String getCollaborationType() {
        return collaborationType;
    }

    public void setCollaborationType(String collaborationType) {
        this.collaborationType = collaborationType;
    }

    public String getRequiredProfile() {
        return requiredProfile;
    }

    public void setRequiredProfile(String requiredProfile) {
        this.requiredProfile = requiredProfile;
    }

    public String getTourismProjectType() {
        return tourismProjectType;
    }

    public void setTourismProjectType(String tourismProjectType) {
        this.tourismProjectType = tourismProjectType;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
}