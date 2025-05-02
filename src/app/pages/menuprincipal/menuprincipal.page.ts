import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.page.html',
  styleUrls: ['./menuprincipal.page.scss'],
  standalone: false
})
export class MenuprincipalPage implements OnInit {

  form = new FormGroup({
    voltaje: new FormControl('', [Validators.required]),
    amperaje: new FormControl('', [Validators.required]),
    consumo_KWH: new FormControl('', [Validators.required]),
  });
  
  resultado: number | null = null;
  
  calcular() {
    if (this.form.valid) {
      const voltaje = Number(this.form.value.voltaje);
      const amperaje = Number(this.form.value.amperaje);
  
      if (!isNaN(voltaje) && !isNaN(amperaje)) {
        this.resultado = (voltaje * amperaje) / 1000;
      } else {
        this.resultado = null;
      }
    }
  }
  reset() {
    this.form.reset();
    this.resultado = null;
  }
  
  //form = new FormGroup({
    //voltaje: new FormControl('',[Validators.required]),
    //amperaje: new FormControl('',[Validators.required]),
    //consumo_KWH: new FormControl('',[Validators.required])
 // })

  constructor() { }

  ngOnInit() {
  }

}
