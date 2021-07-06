import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaTrabajoPageRoutingModule } from './area-trabajo-routing.module';

import { AreaTrabajoPage } from './area-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaTrabajoPageRoutingModule
  ],
  declarations: [AreaTrabajoPage]
})
export class AreaTrabajoPageModule {}
