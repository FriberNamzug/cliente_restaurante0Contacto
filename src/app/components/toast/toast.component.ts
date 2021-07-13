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

  async toast(mensaje:string){

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
  
  
    await toast.present();
  }

}
