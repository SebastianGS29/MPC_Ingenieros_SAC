import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormularioModalComponent } from 'src/app/shared/comoponents/formulario-modal/formulario-modal.component';

@Component({
  selector: 'app-calculoenergia',
  templateUrl: './calculoenergia.page.html',
  styleUrls: ['./calculoenergia.page.scss'],
  standalone: false
})
export class CalculoenergiaPage implements OnInit {


  equiposAgregados: any[] = []; // lista de objetos agregados desde el modal

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  equipos = [
    { nombre: 'Licuadora', imagen: 'assets/img/licuadora.png', potencia: 300 },
    { nombre: 'Refrigeradora', imagen: 'assets/img/refrigeradora.png', potencia: 800 },
    { nombre: 'Microondas', imagen: 'assets/img/microondas.png', potencia: 1200 },
    
    // agrega más equipos
  ];

  async abrirModalConEquipo(equipo: any) {
    const modal = await this.modalCtrl.create({
      component: FormularioModalComponent,
      componentProps: {
        equipo: equipo.nombre,
        potencia: equipo.potencia
      }
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.procesarEquipo(result.data);
      }
    });
  
    return await modal.present();
  }

  procesarEquipo(equipoCalculado: any) {
    const horasTotal = equipoCalculado.horas + (equipoCalculado.minutos / 60);
    const consumo = (equipoCalculado.potencia * equipoCalculado.cantidad * horasTotal * equipoCalculado.dias) / 1000;
  
    const item = {
      nombre: equipoCalculado.equipo,
      kwh: consumo.toFixed(2),
      kwhMes: (consumo * 1).toFixed(2), // O *30 si deseas mensual
      costo: (consumo * 0.67).toFixed(2) // tarifa ajustada
    };
  
    this.equiposAgregados.push(item);
  }
}
