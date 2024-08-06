import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJokeComponent } from './add-joke.component';

describe('AddJokeComponent', () => {
  let component: AddJokeComponent;
  let fixture: ComponentFixture<AddJokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddJokeComponent]
    });
    fixture = TestBed.createComponent(AddJokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
