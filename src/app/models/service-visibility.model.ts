export interface ServiceVisibilityItem {
  id: string;
  name: string;
  category: string;
  isActive: boolean;
  visibilityScore: number;
  impressions: number;
  clicks: number;
  ctr: number;
  isBoosted: boolean;
  radius: number;
  keywords: string[];
  targetType: 'B2C' | 'B2B' | 'Tous';
}
