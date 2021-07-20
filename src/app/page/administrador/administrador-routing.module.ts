import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorPage } from './administrador.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorPage,
    children:[
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
        path: 'ayuda',
        loadChildren: () => import('./ayuda/ayuda.module').then( m => m.AyudaPageModule)
      },
      {
        path: 'seguridad',
        loadChildren: () => import('../seguridad/seguridad.module').then( m => m.SeguridadPageModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
      },
      {
        path: 'empleados',
        loadChildren: () => import('./empleados/empleados.module').then( m => m.EmpleadosPageModule)
      },
      {
        path: 'mi-perfil',
        loadChildren: () => import('../mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
      },
      {
        path: '',
        redirectTo: 'panel-control',
        pathMatch: 'full'
      },  
    ]
  },







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorPageRoutingModule {}
