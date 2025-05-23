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
    const consumo = (equipoCalculado.potencia * equipoCalculado.cantidad * equipoCalculado.horas * equipoCalculado.dias) / 1000;

    const item = {
      nombre: equipoCalculado.equipo,
      potencia: equipoCalculado.potencia,
      cantidad: equipoCalculado.cantidad,
      horas: equipoCalculado.horas,
      dias: equipoCalculado.dias,
      kwh: consumo.toFixed(2),
      kwhMes: (consumo * 1).toFixed(2),
      costo: (consumo * 0.67).toFixed(2)
    };

    this.equiposAgregados.push(item);
  }

  async editarEquipo(index: number) {
    const equipo = this.equiposAgregados[index];

    const modal = await this.modalCtrl.create({
      component: FormularioModalComponent,
      componentProps: {
        equipo: equipo.nombre,
        potencia: equipo.potencia,
        cantidad: equipo.cantidad,
        horas: equipo.horas,
        dias: equipo.dias
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const actualizado = result.data;
        const consumo = (actualizado.potencia * actualizado.cantidad * actualizado.horas * actualizado.dias) / 1000;

        this.equiposAgregados[index] = {
          nombre: actualizado.equipo,
          potencia: actualizado.potencia,
          cantidad: actualizado.cantidad,
          horas: actualizado.horas,
          dias: actualizado.dias,
          kwh: consumo.toFixed(2),
          kwhMes: (consumo * 1).toFixed(2),
          costo: (consumo * 0.67).toFixed(2)
        };
      }
    });

    return await modal.present();
  }
  
get costoTotal(): string {
  const total = this.equiposAgregados.reduce((sum, eq) => sum + parseFloat(eq.costo), 0);
  return total.toFixed(2);
}

  eliminarEquipo(index: number) {
    this.equiposAgregados.splice(index, 1);
  }
}
