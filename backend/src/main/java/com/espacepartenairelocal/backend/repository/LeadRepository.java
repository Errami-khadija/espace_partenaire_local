package com.espacepartenairelocal.backend.repository;

import com.espacepartenairelocal.backend.entity.Lead;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    long countByDateBetween(LocalDate startDate, LocalDate endDate);

    long count();

    @Query("""
    SELECT l.announcement.title,
           COUNT(l),
           COALESCE(SUM(l.announcement.views), 0)
    FROM Lead l
    WHERE l.announcement IS NOT NULL
    GROUP BY l.announcement.title
    ORDER BY COALESCE(SUM(l.announcement.views), 0) DESC
    """)
    List<Object[]> getAnnouncementRanking();
}