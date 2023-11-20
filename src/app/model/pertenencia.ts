import { Ayuda } from "./Ayuda";
import { Ciudadano } from "./Ciudadano";
import { PertenenciasColor } from "./color";
import { marca } from "./marca";
import { modelo } from "./modelo";
import { PertenenciasTipo } from "./tipo";
import { UbicacionP } from "./ubicacionP";

export class Pertenencias{
  idPertenencias: number=0;
  namePertenencias: string="";
  anioPertenencias: Date=new Date();
  especificacionesPertenencias: string="";
  imagenPertenencias: string="";
  idPertenenciasColor: PertenenciasColor=new PertenenciasColor();
  idPertenenciasTipo: PertenenciasTipo=new PertenenciasTipo();
  idPertenenciasMarca: marca= new marca();
  idPertenenciasModelo: modelo= new modelo();
  idCiudadano: Ciudadano= new Ciudadano();
  idUbicacionP: UbicacionP=new UbicacionP();
  idAyuda: Ayuda= new Ayuda();
}
