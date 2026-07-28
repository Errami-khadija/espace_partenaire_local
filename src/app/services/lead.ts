import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lead } from '../models/lead.model';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private apiUrl = 'http://localhost:8080/api/local-partner/leads';

  constructor(private http: HttpClient) {}

  getAllLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiUrl);
  }
}