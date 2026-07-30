import { Component, signal, computed } from '@angular/core';
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

interface ServiceVisibilityItem {
  id: string;
  name: string;
  category: string;
  isActive: boolean;
  visibilityScore: number; // 0-100
  impressions: number;
  clicks: number;
  ctr: number; // percentage
  isBoosted: boolean;
  radius: number; // km
  keywords: string[];
  targetType: 'B2C' | 'B2B' | 'Tous';
}

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
export class ServicesVisibility {
  // Service list state using signals for reactive updates
  protected readonly services = signal<ServiceVisibilityItem[]>([
    {
      id: 'srv-1',
      name: 'Rénovation de Salle de Bain',
      category: 'Plomberie & Travaux',
      isActive: true,
      visibilityScore: 92,
      impressions: 14200,
      clicks: 738,
      ctr: 5.2,
      isBoosted: true,
      radius: 25,
      keywords: ['salle de bain', 'douche italienne', 'plomberie', 'carrelage'],
      targetType: 'B2C',
    },
    {
      id: 'srv-2',
      name: 'Dépannage Électrique Urgent',
      category: 'Électricité',
      isActive: true,
      visibilityScore: 87,
      impressions: 9800,
      clicks: 470,
      ctr: 4.8,
      isBoosted: false,
      radius: 15,
      keywords: ['panne électricité', 'court-circuit', 'urgence électricien'],
      targetType: 'Tous',
    },
    {
      id: 'srv-3',
      name: 'Pose de Parquet & Sols',
      category: 'Menuiserie & Sols',
      isActive: false,
      visibilityScore: 45,
      impressions: 2400,
      clicks: 50,
      ctr: 2.1,
      isBoosted: false,
      radius: 30,
      keywords: ['parquet', 'sol stratifié', 'pose parquet', 'rénovation sol'],
      targetType: 'B2C',
    },
    {
      id: 'srv-4',
      name: 'Peinture Intérieure & Enduits',
      category: 'Peinture & Décoration',
      isActive: true,
      visibilityScore: 95,
      impressions: 18500,
      clicks: 1184,
      ctr: 6.4,
      isBoosted: true,
      radius: 40,
      keywords: ['peinture mur', 'peintre professionnel', 'enduit', 'déco salon'],
      targetType: 'Tous',
    },
    {
      id: 'srv-5',
      name: 'Conseil & Planification 3D',
      category: 'Décoration & Design',
      isActive: true,
      visibilityScore: 72,
      impressions: 6100,
      clicks: 213,
      ctr: 3.5,
      isBoosted: false,
      radius: 50,
      keywords: ['plan 3D', 'architecte intérieur', 'conseil déco', 'aménagement'],
      targetType: 'B2B',
    },
  ]);

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
    this.services.update(list => 
      list.map(s => {
        if (s.id === id) {
          const nextActive = !s.isActive;
          // Dynamically adjust visibility score slightly when status changes
          const nextScore = nextActive 
            ? Math.min(100, s.visibilityScore + 15) 
            : Math.max(10, s.visibilityScore - 15);
          
          Swal.fire({
            title: nextActive ? 'Annonce Activée' : 'Annonce Désactivée',
            text: `L'annonce "${s.name}" est désormais ${nextActive ? 'visible' : 'masquée'} pour vos clients.`,
            icon: nextActive ? 'success' : 'info',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });

          return { ...s, isActive: nextActive, visibilityScore: nextScore };
        }
        return s;
      })
    );
  }

  // Toggle Booster
  toggleBooster(id: string, event: Event): void {
    event.stopPropagation();
    this.services.update(list => 
      list.map(s => {
        if (s.id === id) {
          const nextBoost = !s.isBoosted;
          const nextScore = nextBoost 
            ? Math.min(100, s.visibilityScore + 20) 
            : Math.max(10, s.visibilityScore - 20);

          Swal.fire({
            title: nextBoost ? 'Boost Premium Activé !' : 'Boost Désactivé',
            text: nextBoost 
              ? `Votre annonce "${s.name}" bénéficie d'une visibilité prioritaire (+50% d'impressions).`
              : `Le booster de visibilité a été retiré pour "${s.name}".`,
            icon: nextBoost ? 'success' : 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#4338ca'
          });

          return { ...s, isBoosted: nextBoost, visibilityScore: nextScore };
        }
        return s;
      })
    );
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

    this.services.update(list => 
      list.map(s => {
        if (s.id === edited.id) {
          // Adjust visibility score slightly based on settings (e.g. wider radius/keywords slightly increases score)
          let finalScore = s.visibilityScore;
          if (edited.radius !== s.radius || edited.keywords.length !== s.keywords.length) {
            const keywordBonus = Math.min(10, edited.keywords.length * 2);
            const radiusBonus = Math.min(10, Math.floor(edited.radius / 10));
            finalScore = Math.min(100, 60 + keywordBonus + radiusBonus + (edited.isBoosted ? 20 : 0));
          }

          return { 
            ...edited, 
            visibilityScore: edited.isActive ? finalScore : Math.max(10, finalScore - 15) 
          };
        }
        return s;
      })
    );

    Swal.fire({
      title: 'Configuration Enregistrée',
      text: `Les paramètres de visibilité pour "${edited.name}" ont été mis à jour avec succès.`,
      icon: 'success',
      confirmButtonText: 'Fermer',
      confirmButtonColor: '#4338ca'
    });

    this.closeSettings();
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
