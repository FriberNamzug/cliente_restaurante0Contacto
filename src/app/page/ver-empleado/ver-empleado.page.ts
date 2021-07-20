import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-empleado',
  templateUrl: './ver-empleado.page.html',
  styleUrls: ['./ver-empleado.page.scss'],
})
export class VerEmpleadoPage implements OnInit {

  constructor(    public modalController: ModalController,
) { }

  ngOnInit() {
  }


  async dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });

  }



}
