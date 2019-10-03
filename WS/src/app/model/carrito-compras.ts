import { Servis } from './servis';
export class CarritoCompras {

  constructor(
    //public cliente: Cliente,
    public servicios: Servis[],
    public CostoTotal: number,
    public numPlanes: number
  ) {}

}
