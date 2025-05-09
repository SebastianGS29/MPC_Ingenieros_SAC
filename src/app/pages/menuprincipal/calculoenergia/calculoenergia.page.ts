import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormularioModalComponent } from 'src/app/shared/comoponents/formulario-modal/formulario-modal.component';

type Ambiente = 'Doméstico' | 'Residencial' | 'Industrial';

@Component({
  selector: 'app-calculoenergia',
  templateUrl: './calculoenergia.page.html',
  styleUrls: ['./calculoenergia.page.scss'],
  standalone: false
})
export class CalculoenergiaPage implements OnInit {

  ambientes: Ambiente[] = ['Doméstico', 'Residencial', 'Industrial'];
  ambienteSeleccionado: Ambiente = 'Doméstico';
  equiposAgregados: any[] = [];
  
  get imagenAmbiente(): string {
    switch (this.ambienteSeleccionado) {
      case 'Doméstico':
        return 'assets/img/domestico.jpg';
      case 'Residencial':
        return 'assets/img/residencial.jpg';
      case 'Industrial':
        return 'assets/img/industrial.jpg';
      default:
        return '';
    }
  }
  
  todosLosEquipos: Record<Ambiente, { nombre: string; potencia: number }[]> = {
    Doméstico: [
      { nombre: 'Licuadora', potencia: 300 },
      { nombre: 'Microondas', potencia: 1200 }
    ],
    Residencial: [
      { nombre: 'Refrigeradora', potencia: 800 },
      { nombre: 'Televisor', potencia: 150 }
    ],
    Industrial: [
      { nombre: 'Compresora', potencia: 5000 },
      { nombre: 'Torno', potencia: 7000 }
    ]
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  get equipos(): { nombre: string; potencia: number }[] {
    return this.todosLosEquipos[this.ambienteSeleccionado];
  }

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
      kwhMes: (consumo * 1).toFixed(2),
      costo: (consumo * 0.67).toFixed(2)
    };

    this.equiposAgregados.push(item);
  }
}
