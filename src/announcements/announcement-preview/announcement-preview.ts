import { Component, input, output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-announcement-preview',
  imports: [],
  standalone: true,
  templateUrl: './announcement-preview.html',
  styleUrl: './announcement-preview.css',
})
export class AnnouncementPreview implements OnDestroy {
    announcement = input<any>();

     submit = output<void>();

     back = output<void>();

    selectedFiles = input<File[]>([]);
    private previewUrls = new Map<File, string>();

   getFilePreview(file: File): string {

  if (!this.previewUrls.has(file)) {
    this.previewUrls.set(file, URL.createObjectURL(file));
  }

  return this.previewUrls.get(file)!;

}


ngOnDestroy(): void {

  this.previewUrls.forEach(url => URL.revokeObjectURL(url));
  this.previewUrls.clear();

}

   
}
