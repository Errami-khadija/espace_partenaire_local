import { Component, input } from '@angular/core';

@Component({
  selector: 'app-announcement-preview',
  imports: [],
  standalone: true,
  templateUrl: './announcement-preview.html',
  styleUrl: './announcement-preview.css',
})
export class AnnouncementPreview {
    announcement = input<any>();

    selectedFiles = input<File[]>([]);

    getFilePreview(file: File): string {
  return URL.createObjectURL(file);
}

   
}
