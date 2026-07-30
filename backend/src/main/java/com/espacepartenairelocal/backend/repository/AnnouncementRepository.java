package com.espacepartenairelocal.backend.repository;

import com.espacepartenairelocal.backend.entity.Announcement;
import com.espacepartenairelocal.backend.enums.AnnouncementStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    long countByStatus(AnnouncementStatus status);

@Query("SELECT COALESCE(SUM(a.views), 0) FROM Announcement a")
Integer getTotalViews();

List<Announcement> findAllByOrderByViewsDesc();
}