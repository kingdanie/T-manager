import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NagivationComponent } from './nagivation.component';

describe('NagivationComponent', () => {
  let component: NagivationComponent;
  let fixture: ComponentFixture<NagivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NagivationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NagivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
