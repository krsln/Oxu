import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-root.html',
  styleUrl: './layout-root.scss',
})
export class LayoutRoot {
  toggle = false;
}
