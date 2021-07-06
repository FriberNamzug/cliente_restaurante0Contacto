import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaTrabajoPage } from './area-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: AreaTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaTrabajoPageRoutingModule {}
