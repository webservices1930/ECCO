import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarcarritoComponent } from './mostrarcarrito.component';

describe('MostrarcarritoComponent', () => {
  let component: MostrarcarritoComponent;
  let fixture: ComponentFixture<MostrarcarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarcarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarcarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
