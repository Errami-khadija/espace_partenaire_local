import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceVisibilityItem } from '../models/service-visibility.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceVisibilityService {

  private apiUrl = 'http://localhost:8080/api/local-partner/visibility-services';

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<ServiceVisibilityItem[]> {
    return this.http.get<ServiceVisibilityItem[]>(this.apiUrl);
  }

  getServiceById(id: string): Observable<ServiceVisibilityItem> {
    return this.http.get<ServiceVisibilityItem>(`${this.apiUrl}/${id}`);
  }

  createService(data: Partial<ServiceVisibilityItem>): Observable<ServiceVisibilityItem> {
    return this.http.post<ServiceVisibilityItem>(this.apiUrl, data);
  }

  updateService(id: string, data: Partial<ServiceVisibilityItem>): Observable<ServiceVisibilityItem> {
    return this.http.put<ServiceVisibilityItem>(`${this.apiUrl}/${id}`, data);
  }

  toggleServiceStatus(id: string, isActive: boolean): Observable<ServiceVisibilityItem> {
    return this.http.patch<ServiceVisibilityItem>(`${this.apiUrl}/${id}/status`, { isActive });
  }

  toggleServiceBooster(id: string, isBoosted: boolean): Observable<ServiceVisibilityItem> {
    return this.http.patch<ServiceVisibilityItem>(`${this.apiUrl}/${id}/boost`, { isBoosted });
  }

  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
