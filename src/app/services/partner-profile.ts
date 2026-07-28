import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartnerProfile } from '../models/PartnerProfile.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerProfileService {

  private apiUrl = 'http://localhost:8080/api/local-partner/profil';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<PartnerProfile> {
    return this.http.get<PartnerProfile>(this.apiUrl);
  }

  updateProfile(profile: PartnerProfile): Observable<PartnerProfile> {
    return this.http.put<PartnerProfile>(this.apiUrl, profile);
  }
}