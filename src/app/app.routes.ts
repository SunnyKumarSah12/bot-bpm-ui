import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', // Lazy load the Demand Management module
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'demand', // Lazy load the Demand Management module
    loadChildren: () =>
      import('./demand-management/demand-management.module').then(
        (m) => m.DemandManagementModule
      ),
  },
  {
    path: 'skill-search',
    loadChildren: () =>
      import('./skill-search/skill-search.module').then(m => m.SkillSearchModule),
  },
  { path: '**', redirectTo: 'dashboard' },
];
