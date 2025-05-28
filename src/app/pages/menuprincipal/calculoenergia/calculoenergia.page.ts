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

 todosLosEquipos: Record<Ambiente, { nombre: string; potencia: number }[]> = {
    Doméstico: [
      { nombre: 'Licuadora', potencia: 300 },
      { nombre: 'Microondas', potencia: 1200 },
      { nombre: 'Plancha', potencia: 1000 },
      { nombre: 'Televisor', potencia: 150 },
      { nombre: 'Cafetera', potencia: 800 },
      { nombre: 'Lavadora', potencia: 500 },
      { nombre: 'Secadora de pelo', potencia: 1500 },
      { nombre: 'Aspiradora', potencia: 1400 },
      { nombre: 'Ventilador', potencia: 75 },
      { nombre: 'Cargador de celular', potencia: 10 },
      { nombre: 'Computadora portátil', potencia: 65 },
      { nombre: 'Router WiFi', potencia: 12 },
      { nombre: 'Lámpara LED', potencia: 9 },
      { nombre: 'Reproductor de DVD', potencia: 20 }
    ],
    Residencial: [
      { nombre: 'Refrigeradora', potencia: 800 },
      { nombre: 'Televisor', potencia: 150 },
      { nombre: 'Aire acondicionado', potencia: 2000 },
      { nombre: 'Calefactor eléctrico', potencia: 1500 },
      { nombre: 'Horno eléctrico', potencia: 1800 },
      { nombre: 'Lavavajillas', potencia: 1200 },
      { nombre: 'Congelador', potencia: 700 },
      { nombre: 'Bomba de agua', potencia: 1000 },
      { nombre: 'Extractor de cocina', potencia: 250 },
      { nombre: 'Sistema de sonido', potencia: 100 },
      { nombre: 'Jacuzzi', potencia: 3000 },
      { nombre: 'Secadora de ropa', potencia: 3000 },
      { nombre: 'Computadora de escritorio', potencia: 250 },
      { nombre: 'Impresora láser', potencia: 400 }
    ],
    Industrial: [
      { nombre: 'Compresora', potencia: 5000 },
      { nombre: 'Torno', potencia: 7000 },
      { nombre: 'Soldadora eléctrica', potencia: 4500 },
      { nombre: 'Taladro industrial', potencia: 3000 },
      { nombre: 'Pulidora', potencia: 3500 },
      { nombre: 'Cortadora de metal', potencia: 6000 },
      { nombre: 'Horno industrial', potencia: 10000 },
      { nombre: 'Prensa hidráulica', potencia: 8000 },
      { nombre: 'Molino industrial', potencia: 7500 },
      { nombre: 'Sistema de ventilación', potencia: 4000 },
      { nombre: 'Elevador de carga', potencia: 9000 },
      { nombre: 'Generador eléctrico', potencia: 11000 },
      { nombre: 'Lavadora industrial', potencia: 8500 },
      { nombre: 'Refrigeración industrial', potencia: 9500 }
    ]
  };

  imagenesAmbientes: Record<Ambiente, string> = {
    Doméstico: 'assets/img/domestico.jpg',
    Residencial: 'assets/img/residencial.jpg',
    Industrial: 'assets/img/industrial.jpg'
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  getEquipos(ambiente: Ambiente): { nombre: string; potencia: number }[] {
    return this.todosLosEquipos[ambiente];
  }

  getImagenAmbiente(ambiente: Ambiente): string {
    return this.imagenesAmbientes[ambiente];
  }

  async abrirModalConEquipo(ambiente: Ambiente, equipo: any) {
    const modal = await this.modalCtrl.create({
      component: FormularioModalComponent,
      componentProps: {
        equipo: equipo.nombre,
        potencia: equipo.potencia
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.procesarEquipo(result.data, ambiente);
      }
    });

    return await modal.present();
  }

 procesarEquipo(equipoCalculado: any, ambiente: Ambiente) {
  const horasTotal = equipoCalculado.horas;
  const consumo = (equipoCalculado.potencia * equipoCalculado.cantidad * horasTotal * equipoCalculado.dias) / 1000;

  const item = {
    nombre: equipoCalculado.equipo,
    potencia: equipoCalculado.potencia, 
    cantidad: equipoCalculado.cantidad,
    horas: equipoCalculado.horas,       
    dias: equipoCalculado.dias,         
    kwh: consumo.toFixed(2),
    kwhMes: (consumo * 1).toFixed(2),
    costo: parseFloat((consumo * 0.67).toFixed(2)),
    ambiente: ambiente
  };

  this.equiposAgregados.push(item);
}
  eliminarEquipo(index: number) {
    this.equiposAgregados.splice(index, 1);
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
      const horasTotal = result.data.horas;
      const consumo = (result.data.potencia * result.data.cantidad * horasTotal * result.data.dias) / 1000;

      this.equiposAgregados[index] = {
        nombre: result.data.equipo,
        potencia: result.data.potencia,
        cantidad: result.data.cantidad,
        horas: result.data.horas,
        dias: result.data.dias,
        kwh: consumo.toFixed(2),
        kwhMes: (consumo * 1).toFixed(2),
        costo: parseFloat((consumo * 0.67).toFixed(2)),
        ambiente: equipo.ambiente
      };
    }
  });

  return await modal.present();
}

  get totalCosto(): number {
    return this.equiposAgregados.reduce((sum, eq) => sum + eq.costo, 0);
  }
}
