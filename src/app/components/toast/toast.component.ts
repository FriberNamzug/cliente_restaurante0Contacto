import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {

  constructor(private toastController: ToastController) { }

  ngOnInit() {}
  tiempo: string = '1500'
  ubicacion: string = 'button'
  async toast(mensaje:string){

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 300
    });
  
  
    await toast.present();
  }

}
