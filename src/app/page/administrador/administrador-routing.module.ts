import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorPage } from './administrador.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorPage
  },
  {
    path: 'panel-control',
    loadChildren: () => import('./panel-control/panel-control.module').then( m => m.PanelControlPageModule)
  },
  {
    path: 'mensaje',
    loadChildren: () => import('./mensaje/mensaje.module').then( m => m.MensajePageModule)
  },
  {
    path: 'estadistica',
    loadChildren: () => import('./estadistica/estadistica.module').then( m => m.EstadisticaPageModule)
  },
  {
    path: 'meseros',
    loadChildren: () => import('./meseros/meseros.module').then( m => m.MeserosPageModule)
  },
  {
    path: 'empleado',
    loadChildren: () => import('./empleado/empleado.module').then( m => m.EmpleadoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorPageRoutingModule {}
