import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatisticsResponse } from '../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/local-partner/statistiques';

  getStatistics(): Observable<StatisticsResponse> {
    return this.http.get<StatisticsResponse>(this.apiUrl);
  }
}