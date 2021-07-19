import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { ModalController,IonRouterOutlet } from '@ionic/angular';
import { VerProductoPage } from '../../ver-producto/ver-producto.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {
  producto = []
  carrito = []
  constructor(
    private _serviceProducto: ProductoService,
    private _serviceUsuario: UsuarioService,
    private router: Router,
    private AlertComponent: AlertComponent,
    private ToastComponent: ToastComponent,
    public modalController: ModalController

  ) { 


  }

  ngOnInit() {
    this.obtenerProductos()
  }

 obtenerProductos(){

    this._serviceProducto.obtenerProductos().subscribe(data=>{
    this.producto = data.productos
    console.log(data)
    })
  }


 async llevar(idProducto){

  let idUsuario = localStorage.getItem('usuario')

let ids = {
  productoId: idProducto,
  usuarioId: idUsuario
}
  console.log(`Usuario: ${idUsuario}. Producto: ${idProducto}`)

    await this._serviceUsuario.agregarCarritoProducto(ids).subscribe(data=>{
      
      localStorage.setItem('carrito',data.productoAgregado.carrito.length)
      this.ToastComponent.toast("Agregado con exito!")


    },error=>{
      console.log(error)
    })
  }

async verMas(data){

    const modal = await this.modalController.create({
      component: VerProductoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': data,
      }
    });
    return await modal.present();

}


}
