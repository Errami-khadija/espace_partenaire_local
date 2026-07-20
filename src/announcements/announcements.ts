import { Component } from '@angular/core';
import { AnnouncementForm } from './announcement-form/announcement-form';
import { AnnouncementTable } from './announcement-table/announcement-table';
import { Announcement } from '../app/models/announcement.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [AnnouncementForm, AnnouncementTable, NgClass],
  templateUrl: './announcements.html',
  styleUrl: './announcements.css',
})

export class Announcements {

   showForm = false;

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
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
}
