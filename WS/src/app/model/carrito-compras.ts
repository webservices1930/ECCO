import { Servis } from './servis';
import { Usuario } from './usuario';
export class CarritoCompras {

  constructor(
    public cliente: Usuario,
    public servicios: Servis[],
    public CostoTotal: number,
    public numPlanes: number
  ) {}

}
