import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { AnnouncementService } from '../../app/services/announcement';

import { Announcement } from '../../app/models/announcement.model';
type SortableColumn =
  | 'title'
  | 'type'
  | 'sector'
  | 'status'
  | 'views'
  | 'createdAt';

@Component({
  selector: 'app-announcement-table',
  standalone: true,
  imports: [NgClass],
  templateUrl: './announcement-table.html',
  styleUrl: './announcement-table.css',
})


export class AnnouncementTable implements OnInit {

@Output() edit = new EventEmitter<Announcement>();
@Output() viewDetails = new EventEmitter<Announcement>();
@Output() refresh = new EventEmitter<void>();

constructor(private announcementService: AnnouncementService, private cdr: ChangeDetectorRef) {}

  announcements: Announcement[] = [];

  ngOnInit(): void {
  this.loadAnnouncements();
}

loadAnnouncements(): void {

  console.log('Loading announcements...');

  this.announcementService.getAllAnnouncements().subscribe({

    next: (data) => {

      console.log('Announcements received:', data);

      this.announcements = [...data];

      this.cdr.detectChanges();

    },

    error: (error) => {

      console.error(error);

      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de charger les annonces.'
      });

    }

  });

}

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

    if (!result.isConfirmed) {
      return;
    }

    this.announcementService
      .archiveAnnouncement(announcement.id!)
      .subscribe({

        next: () => {

  Swal.fire({
    icon: 'success',
    title: 'Annonce archivée',
    text: 'L’annonce a été archivée avec succès.'
  });

  this.loadAnnouncements();

  this.refresh.emit();

  this.cdr.detectChanges();

},

        error: (error) => {

          console.error(error);

          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Impossible d'archiver l'annonce."
          });

        }

      });

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
