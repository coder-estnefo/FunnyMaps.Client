import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnyMapComponent } from './funny-map.component';

describe('FunnyMapComponent', () => {
  let component: FunnyMapComponent;
  let fixture: ComponentFixture<FunnyMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunnyMapComponent]
    });
    fixture = TestBed.createComponent(FunnyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
