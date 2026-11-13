import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Internallayout } from './internallayout';

describe('Internallayout', () => {
  let component: Internallayout;
  let fixture: ComponentFixture<Internallayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Internallayout],
    }).compileComponents();

    fixture = TestBed.createComponent(Internallayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
