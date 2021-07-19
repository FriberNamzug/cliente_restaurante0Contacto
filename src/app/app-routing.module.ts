import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./page/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./page/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./page/administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: 'empleado',
    loadChildren: () => import('./page/empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./page/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./page/seguridad/seguridad.module').then( m => m.SeguridadPageModule)
  },
  {
    path: 'ver-producto',
    loadChildren: () => import('./page/ver-producto/ver-producto.module').then( m => m.VerProductoPageModule)
  }

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
