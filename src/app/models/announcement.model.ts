export interface Announcement {

  // Informations générales
  id: number;

  title: string;

  description: string;

  type: 'investment' | 'collaboration' | 'tourism';

  sector: string;

  region: string;

  contact: string;


  // Statistiques
  status: 'draft' | 'pending' | 'published' | 'rejected' | 'archived';

  views: number;

  date: string;


  // Pièces jointes
  attachments?: string[];


  // Champs Investissement
  investmentAmount?: number;

  estimatedROI?: number;

  projectDuration?: string;


  // Champs Collaboration
  collaborationType?: string;

  requiredProfile?: string;


  // Champs Tourisme
  tourismProjectType?: string;

  capacity?: number;


  // Motif du rejet
  rejectionReason?: string;

}