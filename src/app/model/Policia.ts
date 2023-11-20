import { Users } from "./Users";
import { Comisaria } from "./comisaria";

export class Policia{
  idPolicia: number=0;
  numeroPlacaPolicia: string="";
  fotoRostroPolicia: string="";
  fotoIdentPolicia: string="";
  rangoPolicia: string="";
  idComisaria: Comisaria=new Comisaria();
  users: Users=new Users();
}
