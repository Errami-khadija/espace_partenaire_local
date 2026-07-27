export interface Announcement {

  id?: number;

  title: string;
  description: string;

  type: 'investment' | 'collaboration' | 'tourism';

  sector: string;
  region: string;

  contact: string;

  status: 'draft' | 'pending' | 'published' | 'rejected' | 'archived';

  views: number;

  createdAt?: string;
  updatedAt?: string;

  attachments?: string[];

  amountSought?: number;
  estimatedROI?: number;
  projectDuration?: number;

  collaborationType?: string;
  profileSought?: string;

  tourismProjectType?: string;
  capacity?: number;

  rejectionReason?: string;
}