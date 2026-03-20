import {Routes} from '@angular/router';

import {LayoutRoot} from "./Layouts/layout-root/layout-root";

export const routes: Routes = [
  {
    path: 'Home', component: LayoutRoot,
    loadChildren: () => import('./Modules/home/home-module').then(mod => mod.HomeModule)
  },
  {
    path: '', component: LayoutRoot, children: [
      {path: '', redirectTo: '/Home', pathMatch: 'full'}
    ]
  },
];
