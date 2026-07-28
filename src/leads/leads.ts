import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lead } from '../app/models/lead.model';
import { LeadService } from '../app/services/lead';
import { 
  LucideMessageCircle, 
  LucideMoreVertical, 
  LucideSearch, 
  LucideFilter 
} from '@lucide/angular';
import Swal from 'sweetalert2';


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

    constructor(private leadService: LeadService) {}

 leads: Lead[] = [];

  stats: Stat[] = [];

ngOnInit(): void {
  this.loadLeads();
}

loadLeads(): void {

  this.leadService.getAllLeads().subscribe({

    next: (data) => {

      this.leads = data;
      this.calculateStats();

    },

    error: (error) => {

      console.error(error);

      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de charger les leads.'
      });

    }

  });

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

    case 'NOUVEAU':
      return 'statut-nouveau';

    case 'CONTACTE':
      return 'statut-contacte';

    case 'EN_NEGOCIATION':
      return 'statut-negociation';

    default:
      return '';

  }

}

getStatutLabel(statut: string): string {

  switch (statut) {

    case 'NOUVEAU':
      return 'Nouveau';

    case 'CONTACTE':
      return 'Contacté';

    case 'EN_NEGOCIATION':
      return 'En Négociation';

    default:
      return statut;

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
        lead.statut = 'CONTACTE';
      }
    });
  }
}
