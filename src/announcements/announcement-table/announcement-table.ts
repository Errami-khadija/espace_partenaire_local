import { Component, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';

import { Announcement } from '../../app/models/announcement.model';
type SortableColumn =
  | 'title'
  | 'type'
  | 'sector'
  | 'status'
  | 'views'
  | 'date';

@Component({
  selector: 'app-announcement-table',
  standalone: true,
  imports: [NgClass],
  templateUrl: './announcement-table.html',
  styleUrl: './announcement-table.css',
})


export class AnnouncementTable {

@Output() edit = new EventEmitter<Announcement>();
@Output() viewDetails = new EventEmitter<Announcement>();

  announcements: Announcement[] = [
  {
    id: 1,
    title: 'Complexe touristique à Hammamet',
    description: 'Projet de création d’un complexe touristique comprenant un hôtel, un centre de bien-être et des espaces de loisirs.',
    type: 'investment',
    sector: 'Tourisme',
    region: 'Hammamet',
    contact: '20123456',
    status: 'published',
    views: 245,
    date: '20/07/2026',
    investmentAmount: 5000000,
    estimatedROI: 12,
    projectDuration: '24 mois',
    attachments: []
  },
  {
    id: 2,
    title: 'Recherche partenaire pour une plateforme FinTech',
    description: 'Recherche d’un partenaire technologique pour développer une plateforme de services financiers numériques.',
    type: 'collaboration',
    sector: 'Technologie',
    region: 'Tunis',
    contact: '22123456',
    status: 'pending',
    views: 53,
    date: '18/07/2026',
    collaborationType: 'Partenariat stratégique',
    requiredProfile: 'Entreprise spécialisée en FinTech',
    attachments: []
  },
  {
    id: 3,
    title: 'Projet de ferme oléicole à Sfax',
    description: 'Développement d’une exploitation oléicole moderne avec unité de transformation et d’exportation.',
    type: 'investment',
    sector: 'Agriculture',
    region: 'Sfax',
    contact: '23123456',
    status: 'draft',
    views: 0,
    date: '15/07/2026',
    investmentAmount: 1800000,
    estimatedROI: 10,
    projectDuration: '18 mois',
    attachments: []
  },
  {
    id: 4,
    title: 'Circuit culturel à Carthage',
    description: 'Organisation d’un circuit touristique mettant en valeur les sites historiques et culturels de Carthage.',
    type: 'tourism',
    sector: 'Culture & Tourisme',
    region: 'Carthage',
    contact: '24123456',
    status: 'rejected',
    views: 67,
    date: '12/07/2026',
    tourismProjectType: 'Circuit culturel',
    capacity: 80,
    rejectionReason: 'Le dossier est incomplet. Merci de fournir une étude de faisabilité et un budget détaillé.',
    attachments: []
  },
  {
    id: 5,
    title: 'Extension d’une unité industrielle à Bizerte',
    description: 'Extension d’une usine de fabrication afin d’augmenter la capacité de production destinée à l’export.',
    type: 'investment',
    sector: 'Industrie',
    region: 'Bizerte',
    contact: '25123456',
    status: 'archived',
    views: 120,
    date: '10/07/2026',
    investmentAmount: 3200000,
    estimatedROI: 15,
    projectDuration: '30 mois',
    attachments: []
  }
];



sortColumn: SortableColumn = 'title';
sortDirection: 'asc' | 'desc' = 'asc';

sort(column: SortableColumn): void {

  // Changer la direction du tri
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.announcements.sort((a, b) => {

    const valueA = a[column];
    const valueB = b[column];

    // Tri numérique
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return this.sortDirection === 'asc'
        ? valueA - valueB
        : valueB - valueA;
    }

    // Tri alphabétique
    return this.sortDirection === 'asc'
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));

  });

}
editAnnouncement(announcement: Announcement): void {
  this.edit.emit(announcement);
}

archiveAnnouncement(announcement: Announcement): void {

    Swal.fire({
      title: 'Archiver cette annonce ?',
      text: 'Cette action changera le statut en "Archivée".',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, archiver',
      cancelButtonText: 'Annuler'
    }).then((result) => {

      if (result.isConfirmed) {

        announcement.status = 'archived';

        Swal.fire({
          icon: 'success',
          title: 'Annonce archivée',
          text: 'L’annonce a été archivée avec succès.'
        });

      }

    });

  }

viewAnnouncementDetails(announcement: Announcement): void {
  this.viewDetails.emit(announcement);
}

showRejectReason(announcement: Announcement): void {

  Swal.fire({
    title: 'Motif du rejet',
    text: announcement.rejectionReason ?? 'Aucun motif disponible.',
    icon: 'info',
    confirmButtonText: 'Fermer'
  });

}
}
