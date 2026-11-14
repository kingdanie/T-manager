import { Component, input, output, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-page-header',
  styleUrl: './page-header.css',
  templateUrl: './page-header.html',
})
export class PageHeader {
  // Signal-based required input (replaces @Input() titles!: string[])
  titles = input.required<string[]>();

  // Modern output() function (replaces @Output() titleClicked = new EventEmitter<number>())
  titleClicked = output<number>();

  // Signal state for active tab index
  activeIndex = signal<number>(0);

  setActive(index: number): void {
    this.activeIndex.set(index);
    this.titleClicked.emit(index);
  }
}