import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {
  @Input() titles!: string[];
  @Output() titleClicked = new EventEmitter<number>(); // Output event when a title is clicked

  activeIndex: number = 0; // Index of the active title, initialized to the first title

  constructor() { }

  setActive(index: number): void {
    this.activeIndex = index;
    this.titleClicked.emit(index); // Emitting event when a title is clicked
  }

}
