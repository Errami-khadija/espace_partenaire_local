package com.espacepartenairelocal.backend.entity;

import com.espacepartenairelocal.backend.enums.LeadStatus;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String annonce;

    @Column(nullable = false)
    private String pays;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeadStatus statut;



    @ManyToOne
@JoinColumn(name = "announcement_id")
private Announcement announcement;
    // =========================
    // Constructors
    // =========================

    public Lead() {
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

    public String getAnnonce() {
        return annonce;
    }

    public Announcement getAnnouncement() {
    return announcement;
}

    public void setAnnonce(String annonce) {
        this.annonce = annonce;
    }

    public void setAnnouncement(Announcement announcement) {
    this.announcement = announcement;
}



    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LeadStatus getStatut() {
        return statut;
    }

    public void setStatut(LeadStatus statut) {
        this.statut = statut;
    }
}