import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NotificationComponent } from '../Componants/notification/notification.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NotificationComponent],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  currentTitle = 'Dashboard';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateTitle(this.activatedRoute.root);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle(this.activatedRoute.root);
      });
  }

  private updateTitle(route: ActivatedRoute | null): void {
    let currentRoute = route;
    let title = 'Dashboard';

    while (currentRoute) {
      const routeTitle = currentRoute.snapshot.data['title'];
      if (routeTitle) {
        title = routeTitle;
      }
      currentRoute = currentRoute.firstChild;
    }

    this.currentTitle = title;
  }
}
