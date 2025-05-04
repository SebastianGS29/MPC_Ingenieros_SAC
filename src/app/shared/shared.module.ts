import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './comoponents/header/header.component';
import { CustomInputComponent } from './comoponents/custom-input/custom-input.component';
import { LogoComponent } from './comoponents/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioModalModule } from './comoponents/formulario-modal/formulario-modal.module';

@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    // REMUEVE FormularioModalComponent de aquí
  ],
  exports: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    // REMUEVE FormularioModalComponent de aquí
    FormularioModalModule // Exporta el módulo completo
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    FormularioModalModule, // Importa el módulo completo
    // REMUEVE FormularioModalComponent de aquí
  ]
})

export class SharedModule { }
