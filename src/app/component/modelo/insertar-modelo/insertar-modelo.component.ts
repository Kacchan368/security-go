import { Component , OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { modelo } from 'src/app/model/modelo';
import { ModeloService } from 'src/app/service/modelo.service';

@Component({
  selector: 'app-insertar-modelo',
  templateUrl: './insertar-modelo.component.html',
  styleUrls: ['./insertar-modelo.component.css']
})
export class InsertarModeloComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  modelo: modelo = new modelo();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  constructor(private uS: ModeloService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idPertenenciasModelo: ['',],
      namePertenenciasModelo: ['', Validators.required]
      });
}
aceptar(): void {
  if (this.form.valid) {
    this.modelo.idPertenenciasModelo = this.form.value.idPertenenciasModelo;
    this.modelo.namePertenenciasModelo = this.form.value.namePertenenciasModelo;
    if (this.edicion) {
      this.uS.Update(this.modelo).subscribe(() => {
        this.uS.List().subscribe((data) => {
          this.uS.SetList(data);
        });
      });
    } else {
      this.uS.Insert(this.modelo).subscribe((data) => {
        this.uS.List().subscribe((data) => {
          this.uS.SetList(data);
        });
      });
    }
    this.router.navigate(['/components/PertenenciaModelo']);
  } else {
    this.mensaje = 'Por favor complete todos los campos obligatorios.';
  }
}
obtenerControlCampo(nombreCampo: string): AbstractControl {
  const control = this.form.get(nombreCampo);
  if (!control) {
    throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
  }
  return control;
}
init() {
  if (this.edicion) {
    this.uS.ListId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        idPertenenciasModelo: new FormControl(data. idPertenenciasModelo),
        namePertenenciasModelo: new FormControl(data.namePertenenciasModelo)
      });
    });
  }
}
}
