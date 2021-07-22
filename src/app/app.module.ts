import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertComponent } from './components/alert/alert.component';
import { ToastComponent } from './components/toast/toast.component';
import { Url } from './class/url';

import { TouchID } from '@ionic-native/touch-id/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LoadingComponent, AlertComponent, ToastComponent, Url,TouchID,Toast,SpinnerDialog],
  bootstrap: [AppComponent],
})
export class AppModule {}
