import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController
  ) { }

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

  let idUsuario = JSON.parse(localStorage.getItem('usuario'))

let ids = {
  productoId: idProducto,
  usuarioId: idUsuario
}
  console.log(`Usuario: ${idUsuario}. Producto: ${idProducto}`)

    await this._serviceUsuario.agregarCarritoProducto(ids).subscribe(data=>{
      this.carrito = data
      console.log(this.carrito)
      this.toast("Agregado con exito!")
    },error=>{
      console.log(error)
    })
  }

verMas(data){

}



  doRefresh(event){
    console.log('Begin async operation');

    setTimeout(() => {
      window.location.reload();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);



  }

////NOTIFICACIONES!!

  async toast(mensaje:string){

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 500
    });
  
  
    await toast.present();
  }

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
