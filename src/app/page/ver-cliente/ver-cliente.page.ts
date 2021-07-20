import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.page.html',
  styleUrls: ['./ver-cliente.page.scss'],
})
export class VerClientePage implements OnInit {

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
