import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-example-viewer, ExampleViewer',
  imports: [],
  templateUrl: './example-viewer.html',
  styleUrl: './example-viewer.scss',
})
export class ExampleViewer {

  // @Input() Title: string = '';
  @Input() Expanded = false;
  @Input() Overlay = true;

  constructor() {
  }

  ngOnInit(): void {
    // if (this.Title?.length == 0) {
    // this.Title = 'Basic usage <i class="fa-solid fa-flask-vial"></i>';
    // this.Title = 'Basic';
    // }
  }
}
