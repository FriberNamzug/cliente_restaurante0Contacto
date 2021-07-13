import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  
  usuario: any
  length: number
  constructor(
    private _serviceUsuario:UsuarioService,
    private router:Router,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.obtenerUsuario()
    this.usuario
  }

  async obtenerUsuario(){
    let idUsuario = localStorage.getItem('usuario')
    await this._serviceUsuario.obtenerUsuario(idUsuario).subscribe(data=>{

     this.usuario =  data.usuario.carrito
     this.length  = data.usuario.carrito.length 

    })
    
  }
  
  async eliminar(idProducto){

  let ids = { productoId: idProducto,usuarioId: localStorage.getItem('usuario') }
  await this._serviceUsuario.eliminarCarritoProducto(ids).subscribe(data=>{
    console.log(data)

  },error=>{
    console.log(error)
   })
  }
}
