import { Component, OnInit } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }


}
