import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePage } from './cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePage,
    children: [
      
      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
      },

      {
        path: 'mensaje',
        loadChildren: () => import('./mensaje/mensaje.module').then( m => m.MensajePageModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
      },
      {
        path: 'mi-perfil',
        loadChildren: () => import('../mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
      },

      {
        path: 'historial-pedidos',
        loadChildren: () => import('./historial-pedidos/historial-pedidos.module').then( m => m.HistorialPedidosPageModule)
      },
      {
        path: 'metodos-pago',
        loadChildren: () => import('./metodos-pago/metodos-pago.module').then( m => m.MetodosPagoPageModule)
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
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
