import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loading: any

  constructor(private loadingController: LoadingController) { }  

  ngOnInit() {}

  async presentLoading(message){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message,
    });
    return this.loading.present();
  }


}
