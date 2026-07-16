import { Component } from '@angular/core';
import { AnnouncementForm } from './announcement-form/announcement-form';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [AnnouncementForm],
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
}
