import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoPage } from './empleado.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoPage,
    children:[
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
      },
      {
        path: 'mi-perfil',
        loadChildren: () => import('../mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
      },  
      {
        path: 'ayuda',
        loadChildren: () => import('./ayuda/ayuda.module').then( m => m.AyudaPageModule)
      },
      {
        path: 'seguridad',
        loadChildren: () => import('../seguridad/seguridad.module').then( m => m.SeguridadPageModule)
      },
      {
        path: '',
        redirectTo: 'area-trabajo',
        pathMatch: 'full'
      }, 
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoPageRoutingModule {}
