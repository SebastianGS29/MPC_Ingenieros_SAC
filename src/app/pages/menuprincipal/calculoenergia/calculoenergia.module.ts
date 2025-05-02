import { isStandalone, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculoenergiaPageRoutingModule } from './calculoenergia-routing.module';

import { CalculoenergiaPage } from './calculoenergia.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculoenergiaPageRoutingModule,
    SharedModule
  ],
  declarations: [CalculoenergiaPage]
})
export class CalculoenergiaPageModule {}
