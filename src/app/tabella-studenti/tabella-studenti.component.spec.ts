import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaStudentiComponent } from './tabella-studenti.component';

describe('TabellaStudentiComponent', () => {
  let component: TabellaStudentiComponent;
  let fixture: ComponentFixture<TabellaStudentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabellaStudentiComponent]
    });
    fixture = TestBed.createComponent(TabellaStudentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
