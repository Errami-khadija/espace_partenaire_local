import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  LucideSparkles,
  LucideMapPin,
  LucideTags,
  LucideSlidersHorizontal,
  LucideTrendingUp,
  LucideCheck,
  LucideX,
  LucideSearch,
  LucideSettings,
  LucidePlus,
  LucideInfo,
} from '@lucide/angular';

import { ServiceVisibilityService } from '../app/services/service-visibility';
import { ServiceVisibilityItem } from '../app/models/service-visibility.model';

@Component({
  selector: 'app-services-visibility',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideSparkles,
    LucideMapPin,
    LucideTags,
    LucideSlidersHorizontal,
    LucideTrendingUp,
    LucideCheck,
    LucideX,
    LucideSearch,
    LucideSettings,
    LucidePlus,
    LucideInfo,
  ],
  templateUrl: './services-visibility.html',
  styleUrl: './services-visibility.css',
})
export class ServicesVisibility implements OnInit {
  // Service list state using signals for reactive updates
  protected readonly services = signal<ServiceVisibilityItem[]>([]);
  private serviceVisibilityService = inject(ServiceVisibilityService);

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceVisibilityService.getAllServices().subscribe({
      next: (data) => this.services.set(data),
      error: (err) => console.error('Error loading services', err)
    });
  }

  // Search & Filter state
  protected readonly searchQuery = signal<string>('');
  protected readonly selectedCategory = signal<string>('all');
  protected readonly selectedStatus = signal<'all' | 'active' | 'inactive'>('all');

  // Categories list derived from services
  protected readonly categories = computed(() => {
    const cats = new Set(this.services().map(s => s.category));
    return ['all', ...Array.from(cats)];
  });

  // Filtered services list
  protected readonly filteredServices = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const status = this.selectedStatus();

    return this.services().filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(query) || 
                            s.category.toLowerCase().includes(query) ||
                            s.keywords.some(k => k.toLowerCase().includes(query));
      
      const matchesCategory = cat === 'all' || s.category === cat;
      
      const matchesStatus = status === 'all' || 
                            (status === 'active' && s.isActive) ||
                            (status === 'inactive' && !s.isActive);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  });

  // KPI Calculations
  protected readonly totalServicesCount = computed(() => this.services().length);
  
  protected readonly activeServicesCount = computed(() => 
    this.services().filter(s => s.isActive).length
  );
  
  protected readonly averageVisibilityScore = computed(() => {
    const active = this.services().filter(s => s.isActive);
    if (active.length === 0) return 0;
    const total = active.reduce((sum, s) => sum + s.visibilityScore, 0);
    return Math.round(total / active.length);
  });

  protected readonly totalImpressionsCount = computed(() => 
    this.services().reduce((sum, s) => sum + s.impressions, 0)
  );

  // Active service being edited in modal
  protected readonly activeEditingService = signal<ServiceVisibilityItem | null>(null);
  
  // Temporal keyword input for modal
  protected newKeywordInput = '';

  // Toggle service status
  toggleServiceStatus(id: string, event: Event): void {
    event.stopPropagation();
    const service = this.services().find(s => s.id === id);
    if (!service) return;

    const nextActive = !service.isActive;

    this.serviceVisibilityService.toggleServiceStatus(id, nextActive).subscribe({
      next: (updatedService) => {
        this.services.update(list => list.map(s => s.id === id ? updatedService : s));
        Swal.fire({
          title: nextActive ? 'Annonce Activée' : 'Annonce Désactivée',
          text: `L'annonce "${service.name}" est désormais ${nextActive ? 'visible' : 'masquée'} pour vos clients.`,
          icon: nextActive ? 'success' : 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      },
      error: (err) => console.error('Error toggling status', err)
    });
  }

  // Toggle Booster
  toggleBooster(id: string, event: Event): void {
    event.stopPropagation();
    const service = this.services().find(s => s.id === id);
    if (!service) return;

    const nextBoost = !service.isBoosted;

    this.serviceVisibilityService.toggleServiceBooster(id, nextBoost).subscribe({
      next: (updatedService) => {
        this.services.update(list => list.map(s => s.id === id ? updatedService : s));
        Swal.fire({
          title: nextBoost ? 'Boost Premium Activé !' : 'Boost Désactivé',
          text: nextBoost 
            ? `Votre annonce "${service.name}" bénéficie d'une visibilité prioritaire (+50% d'impressions).`
            : `Le booster de visibilité a été retiré pour "${service.name}".`,
          icon: nextBoost ? 'success' : 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4338ca'
        });
      },
      error: (err) => console.error('Error toggling booster', err)
    });
  }

  // Open settings modal
  openSettings(service: ServiceVisibilityItem): void {
    // Deep clone the object so changes are only applied on Save
    this.activeEditingService.set(JSON.parse(JSON.stringify(service)));
    this.newKeywordInput = '';
  }

  // Close settings modal
  closeSettings(): void {
    this.activeEditingService.set(null);
  }

  // Save settings
  saveSettings(): void {
    const edited = this.activeEditingService();
    if (!edited) return;

    this.serviceVisibilityService.updateService(edited.id, edited).subscribe({
      next: (updatedService) => {
        this.services.update(list => list.map(s => s.id === edited.id ? updatedService : s));
        Swal.fire({
          title: 'Configuration Enregistrée',
          text: `Les paramètres de visibilité pour "${edited.name}" ont été mis à jour avec succès.`,
          icon: 'success',
          confirmButtonText: 'Fermer',
          confirmButtonColor: '#4338ca'
        });
        this.closeSettings();
      },
      error: (err) => console.error('Error updating service settings', err)
    });
  }

  // Add keyword chip
  addKeyword(): void {
    const edited = this.activeEditingService();
    const word = this.newKeywordInput.trim().toLowerCase();
    if (!edited || !word) return;

    if (edited.keywords.includes(word)) {
      Swal.fire({
        title: 'Mot-clé existant',
        text: `Le mot-clé "${word}" est déjà configuré.`,
        icon: 'warning',
        confirmButtonText: 'Compris',
        confirmButtonColor: '#4338ca'
      });
      return;
    }

    edited.keywords.push(word);
    this.newKeywordInput = '';
  }

  // Remove keyword chip
  removeKeyword(word: string): void {
    const edited = this.activeEditingService();
    if (!edited) return;

    edited.keywords = edited.keywords.filter(k => k !== word);
  }
}
