import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefecturesComponent } from './prefectures.component';

describe('PrefecturesComponent', () => {
  let component: PrefecturesComponent;
  let fixture: ComponentFixture<PrefecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefecturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
