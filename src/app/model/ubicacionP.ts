import { EstadoUbicacion } from "./estadoUbicacion";

export class UbicacionP{
  idUbicacionP: number=0;
  latitud: number=0;
  longitud: number=0;
  fecha: Date=new Date(Date.now());
  idEstadoUbicacion: EstadoUbicacion=new EstadoUbicacion();
}
