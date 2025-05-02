import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculoenergiaPage } from './calculoenergia.page';

describe('CalculoenergiaPage', () => {
  let component: CalculoenergiaPage;
  let fixture: ComponentFixture<CalculoenergiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoenergiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
