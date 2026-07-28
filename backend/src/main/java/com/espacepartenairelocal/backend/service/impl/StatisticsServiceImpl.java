package com.espacepartenairelocal.backend.service.impl;

import com.espacepartenairelocal.backend.dto.AnnouncementRankingDto;
import com.espacepartenairelocal.backend.dto.DailyViewDto;
import com.espacepartenairelocal.backend.dto.StatisticsDto;
import com.espacepartenairelocal.backend.entity.Announcement;
import com.espacepartenairelocal.backend.entity.Lead;
import com.espacepartenairelocal.backend.repository.AnnouncementRepository;
import com.espacepartenairelocal.backend.repository.LeadRepository;
import com.espacepartenairelocal.backend.service.StatisticsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsServiceImpl implements StatisticsService {

    private final AnnouncementRepository announcementRepository;
    private final LeadRepository leadRepository;

    public StatisticsServiceImpl(
            AnnouncementRepository announcementRepository,
            LeadRepository leadRepository
    ) {
        this.announcementRepository = announcementRepository;
        this.leadRepository = leadRepository;
    }

    @Override
    public StatisticsDto getStatistics() {

        List<Announcement> announcements =
                announcementRepository.findAllByOrderByViewsDesc();

        List<Lead> leads = leadRepository.findAll();

        // ==========================
        // KPI
        // ==========================

        int totalViews = announcementRepository.getTotalViews();

        int totalLeads = leads.size();

        // Temporary values until you have previous-month data
        double viewsGrowth = 12.4;
        double leadsGrowth = 8.1;

        // ==========================
        // Donut Chart
        // ==========================

        double conversionRate = totalViews == 0
                ? 0
                : ((double) totalLeads / totalViews) * 100;

        // ==========================
        // Histogram
        // ==========================

        List<DailyViewDto> dailyViews = new ArrayList<>();

        for (int i = 1; i <= 30; i++) {

            int value = announcements.stream()
                    .mapToInt(Announcement::getViews)
                    .sum() / 30;

            dailyViews.add(
                    new DailyViewDto(
                            String.format("%02d", i),
                            value
                    )
            );
        }

        // ==========================
        // Ranking
        // ==========================

        List<AnnouncementRankingDto> ranking = new ArrayList<>();

        for (Announcement announcement : announcements) {

            long leadCount = leads.stream()
                    .filter(l -> l.getAnnouncement().getId().equals(announcement.getId()))
                    .count();

            ranking.add(
                    new AnnouncementRankingDto(
    announcement.getTitle(),
    leadCount,
    announcement.getViews()
)
            );
        }

        // ==========================
        // DTO
        // ==========================

        return new StatisticsDto(
                totalViews,
                totalLeads,
                viewsGrowth,
                leadsGrowth,
                conversionRate,
                totalViews,
                totalLeads,
                dailyViews,
                ranking
        );
    }
}