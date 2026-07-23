import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideMessageCircle, 
  LucideMoreVertical, 
  LucideSearch, 
  LucideFilter 
} from '@lucide/angular';
import Swal from 'sweetalert2';

interface Lead {
  id: string;
  annonce: string;
  pays: string;
  date: Date;
  statut: 'Nouveau' | 'Contacté' | 'En Négociation';
}

interface Stat {
  annonce: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [
    CommonModule, 
    LucideMessageCircle, 
    LucideMoreVertical, 
    LucideSearch, 
    LucideFilter
  ],
  templateUrl: './leads.html',
  styleUrl: './leads.css',
})
export class Leads implements OnInit {
  leads: Lead[] = [
    { id: 'L-001', annonce: 'Villa de luxe à Marrakech', pays: 'France', date: new Date('2026-07-20'), statut: 'Nouveau' },
    { id: 'L-002', annonce: 'Appartement vue mer Tanger', pays: 'Espagne', date: new Date('2026-07-19'), statut: 'Contacté' },
    { id: 'L-003', annonce: 'Villa de luxe à Marrakech', pays: 'Belgique', date: new Date('2026-07-18'), statut: 'En Négociation' },
    { id: 'L-004', annonce: 'Riad au centre de Fès', pays: 'Royaume-Uni', date: new Date('2026-07-17'), statut: 'Nouveau' },
    { id: 'L-005', annonce: 'Appartement vue mer Tanger', pays: 'Italie', date: new Date('2026-07-16'), statut: 'Contacté' },
    { id: 'L-006', annonce: 'Villa de luxe à Marrakech', pays: 'Émirats Arabes Unis', date: new Date('2026-07-15'), statut: 'Nouveau' },
    { id: 'L-007', annonce: 'Terrain constructible Casablanca', pays: 'Suisse', date: new Date('2026-07-14'), statut: 'En Négociation' }
  ];

  stats: Stat[] = [];

  ngOnInit() {
    this.calculateStats();
  }

  calculateStats() {
    const counts = this.leads.reduce((acc, lead) => {
      acc[lead.annonce] = (acc[lead.annonce] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = this.leads.length;

    this.stats = Object.entries(counts).map(([annonce, count]) => ({
      annonce,
      count,
      percentage: Math.round((count / total) * 100)
    })).sort((a, b) => b.count - a.count);
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'Nouveau': return 'statut-nouveau';
      case 'Contacté': return 'statut-contacte';
      case 'En Négociation': return 'statut-negociation';
      default: return '';
    }
  }

  contacter(lead: Lead) {
    Swal.fire({
      title: "Contacter l'investisseur",
      text: `Ouverture de la messagerie pour le lead de ${lead.pays} (Annonce: ${lead.annonce})`,
      icon: 'info',
      input: 'textarea',
      inputPlaceholder: 'Écrivez votre message ici...',
      showCancelButton: true,
      confirmButtonText: 'Envoyer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#d1d5db',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        Swal.fire({
          title: 'Envoyé!',
          text: 'Votre message a été envoyé avec succès.',
          icon: 'success',
          confirmButtonColor: '#4f46e5'
        });
        lead.statut = 'Contacté';
      }
    });
  }
}
