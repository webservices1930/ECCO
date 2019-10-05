import { TestBed } from '@angular/core/testing';

import { TarjetaCarritoService } from './tarjeta-carrito.service';

describe('TarjetaCarritoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TarjetaCarritoService = TestBed.get(TarjetaCarritoService);
    expect(service).toBeTruthy();
  });
});
