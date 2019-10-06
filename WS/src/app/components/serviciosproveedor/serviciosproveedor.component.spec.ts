import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosproveedorComponent } from './serviciosproveedor.component';

describe('ServiciosproveedorComponent', () => {
  let component: ServiciosproveedorComponent;
  let fixture: ComponentFixture<ServiciosproveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosproveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
