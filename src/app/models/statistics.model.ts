export interface DailyView {
  day: string;
  views: number;
}

export interface AnnouncementRanking {
  title: string;
  leads: number;
  views: number;
}

export interface StatisticsResponse {
  totalViews: number;
  totalLeads: number;

  viewsGrowth: number;
  leadsGrowth: number;

  conversionRate: number;
  conversionViews: number;
  conversionLeads: number;

  dailyViews: DailyView[];
  rankings: AnnouncementRanking[];
}