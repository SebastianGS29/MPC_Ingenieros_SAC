import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioModalComponent } from './formulario-modal.component';

@NgModule({
  declarations: [FormularioModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FormularioModalComponent]
})
export class FormularioModalModule {}