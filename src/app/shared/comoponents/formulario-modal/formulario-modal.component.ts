import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular'; // ← importante

@Component({
  selector: 'app-formulario-modal',
  templateUrl: './formulario-modal.component.html',
  styleUrls: ['./formulario-modal.component.scss'],
  standalone: false,
})
export class FormularioModalComponent implements OnInit {

@Input() equipo: string = '';
@Input() potencia: number = 0;
@Input() cantidad: number = 1;
@Input() horas: number = 1;
@Input() dias: number = 30;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController // ← importante
  ) {
   this.form = this.fb.group({
  equipoNombre: [''], // <- solo se usará si es "Otros"
  cantidad: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
  potencia: [0, [Validators.required, Validators.min(0), Validators.max(15000)]],
  horas: [1, [Validators.required, Validators.min(1), Validators.max(24)]],
  dias: [1, [Validators.required, Validators.min(1), Validators.max(30)]],
  });
 }

 ngOnInit() {
  this.form.patchValue({
    potencia: this.potencia,
    cantidad: this.cantidad,
    horas: this.horas,
    dias: this.dias
  });if (this.equipo === 'Otros') {
  this.form.get('equipoNombre')?.setValidators([Validators.required, Validators.minLength(3)]);
}
}


 onAgregar() {
  if (this.form.valid) {
    const datos = {
      equipo: this.equipo === 'Otros' ? this.form.value.equipoNombre : this.equipo,
      ...this.form.value
    };
    document.activeElement && (document.activeElement as HTMLElement).blur();
    this.modalCtrl.dismiss(datos);
  }
}


  onCerrar() {
    
      // Elimina el foco actual antes de cerrar
      document.activeElement && (document.activeElement as HTMLElement).blur();
      this.modalCtrl.dismiss();
    
  }
}
