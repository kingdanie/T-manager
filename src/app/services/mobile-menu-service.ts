import { Service, signal } from '@angular/core';

@Service()
export class MobileMenuService {
    private isOpenState = signal<boolean>(false);

  // Public read-only signal for components to consume via mobileMenuService.isMobileMenuOpen()
  readonly isMobileMenuOpen = this.isOpenState.asReadonly();

  toggleSideMenu(): void {
    this.isOpenState.update((isOpen) => !isOpen);
  }
}
