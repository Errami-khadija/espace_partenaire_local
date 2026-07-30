import { Component, signal } from '@angular/core';
import { RouterOutlet ,Router} from '@angular/router';
import { SidebarComponent } from '../side-bare/side-bare';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   constructor(public router: Router) {}
  protected readonly title = signal('espace_partenaire_local');
   get isLandingPage(): boolean {
    return this.router.url === '/';
  }
}
