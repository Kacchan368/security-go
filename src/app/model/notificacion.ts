import { Policia } from "./Policia";
import { TipoCaso } from "./TipoCaso";

export class Notificacion{
  idNotificación: number=0;
  idTipoCaso: TipoCaso= new TipoCaso();
  idPolicia: Policia=new Policia();
}
