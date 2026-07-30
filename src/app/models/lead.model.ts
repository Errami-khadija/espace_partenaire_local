export interface Lead {
  id: number;
  annonce: string;
  pays: string;
  date: string;
  statut: 'NOUVEAU' | 'CONTACTE' | 'EN_NEGOCIATION';
}