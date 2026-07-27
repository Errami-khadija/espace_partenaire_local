import { Component } from '@angular/core';
import { AnnouncementForm } from './announcement-form/announcement-form';
import { AnnouncementTable } from './announcement-table/announcement-table';
import { Announcement } from '../app/models/announcement.model';
import { NgClass } from '@angular/common';
import { AnnouncementService } from '../app/services/announcement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [AnnouncementForm, AnnouncementTable, NgClass],
  templateUrl: './announcements.html',
  styleUrl: './announcements.css',
})

export class Announcements {

   showForm = false;
   constructor(
  private announcementService: AnnouncementService
) {}

openForm(): void {
  this.selectedAnnouncement = undefined; 
  this.showForm = true;
}

closeForm(): void {
  this.showForm = false;
  this.selectedAnnouncement = undefined;
}

selectedAnnouncement?: Announcement;


onEditAnnouncement(announcement: Announcement): void {

  this.selectedAnnouncement = announcement;

  this.showForm = true;

}
showDetails = false;

openDetails(announcement: Announcement): void {
  this.selectedAnnouncement = announcement;
  this.showDetails = true;
}

closeDetails(): void {
  this.showDetails = false;
  this.selectedAnnouncement = undefined;
}

deleteAnnouncement(): void {

  if (!this.selectedAnnouncement?.id) {
    return;
  }

  Swal.fire({
    title: 'Supprimer cette annonce ?',
    text: 'Cette action est irréversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#d33'
  }).then(result => {

    if (!result.isConfirmed) {
      return;
    }

    this.announcementService
      .deleteAnnouncement(this.selectedAnnouncement!.id!)
      .subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Annonce supprimée',
            text: 'L’annonce a été supprimée avec succès.'
          });

          this.closeDetails();

        },

        error: (error) => {

          console.error(error);

          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible de supprimer cette annonce.'
          });

        }

      });

  });

}
}
