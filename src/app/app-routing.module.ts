import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
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
  

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
