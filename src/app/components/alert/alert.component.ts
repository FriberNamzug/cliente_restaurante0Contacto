import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  constructor(
    public alertController: AlertController,
    public _serviceProducto: ProductoService     
  ) { 

  }

  ngOnInit() {}

  async alerta(titulo:string,mensaje?:string){
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: titulo,
    message: mensaje,
    buttons: ['OK']
  });

  await alert.present();

}

}
