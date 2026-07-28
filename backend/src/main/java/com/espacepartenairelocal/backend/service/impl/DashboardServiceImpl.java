package com.espacepartenairelocal.backend.service.impl;

import com.espacepartenairelocal.backend.dto.DashboardStatsDto;
import com.espacepartenairelocal.backend.enums.AnnouncementStatus;
import com.espacepartenairelocal.backend.repository.AnnouncementRepository;
import com.espacepartenairelocal.backend.repository.LeadRepository;
import org.springframework.stereotype.Service;
import com.espacepartenairelocal.backend.service.DashboardService;
import java.time.LocalDate;


import java.util.List;



@Service
public class DashboardServiceImpl implements DashboardService {

    private final AnnouncementRepository announcementRepository;
    private final LeadRepository leadRepository;

    public DashboardServiceImpl(
            AnnouncementRepository announcementRepository,
            LeadRepository leadRepository) {

        this.announcementRepository = announcementRepository;
        this.leadRepository = leadRepository;
    }

    @Override
    public DashboardStatsDto getDashboardStats() {

        LocalDate today = LocalDate.now();

        LocalDate firstDay = today.withDayOfMonth(1);
        LocalDate lastDay = today.withDayOfMonth(today.lengthOfMonth());

        DashboardStatsDto dto = new DashboardStatsDto();

        dto.setActiveAnnouncements(
                (int) announcementRepository.countByStatus(AnnouncementStatus.published));

        dto.setPendingAnnouncements(
                (int) announcementRepository.countByStatus(AnnouncementStatus.pending));

        dto.setMonthlyLeads(
                (int) leadRepository.countByDateBetween(firstDay, lastDay));

        dto.setTotalViews(
                announcementRepository.getTotalViews());

        return dto;
    }
}