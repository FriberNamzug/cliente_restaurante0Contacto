import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoPage } from './empleado.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoPage
  },
  {
    path: 'mensaje',
    loadChildren: () => import('./mensaje/mensaje.module').then( m => m.MensajePageModule)
  },
  {
    path: 'area-trabajo',
    loadChildren: () => import('./area-trabajo/area-trabajo.module').then( m => m.AreaTrabajoPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoPageRoutingModule {}
