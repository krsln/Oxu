import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Home} from './components/home/home';
import {Surah} from './components/surah/surah';
import {Test} from './components/test/test';

const routes: Routes = [
  {
    path: '', data: {breadcrumb: 'Home'},
    children: [
      {path: '', data: {breadcrumb: 'Home'}, component: Home},
      {path: 'Surah/:seq', data: {breadcrumb: 'Surah'}, component: Surah},
      {path: 'Test', data: {breadcrumb: 'Test'}, component: Test},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
