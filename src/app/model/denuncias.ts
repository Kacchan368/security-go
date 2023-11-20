import { Ciudadano } from "./Ciudadano";
import { Comisaria } from "./comisaria";
import { DenunciasLugarHecho } from "./lugarHecho";

export class Denuncias {
  idDenuncias: number = 0;
  nameDenuncias: string = "";
  fechaDenunciasHechos: Date = new Date(Date.now());
  fechaDenunciasRegistro: Date = new Date(Date.now());
  idDenunciasLugarHecho: DenunciasLugarHecho = new DenunciasLugarHecho();
  idCiudadano: Ciudadano = new Ciudadano();
  idComisaria: Comisaria = new Comisaria();
}
