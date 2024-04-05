import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternallayoutComponent } from './internallayout.component';

describe('InternallayoutComponent', () => {
  let component: InternallayoutComponent;
  let fixture: ComponentFixture<InternallayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternallayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternallayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
