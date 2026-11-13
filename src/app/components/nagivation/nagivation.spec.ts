import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nagivation } from './nagivation';

describe('Nagivation', () => {
  let component: Nagivation;
  let fixture: ComponentFixture<Nagivation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nagivation],
    }).compileComponents();

    fixture = TestBed.createComponent(Nagivation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
