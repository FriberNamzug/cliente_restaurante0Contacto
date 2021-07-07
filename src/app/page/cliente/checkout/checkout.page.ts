import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  
  usuario: any []
  length: number
  constructor(
    private _serviceUsuario:UsuarioService,
    private router:Router
  ) { }

  ngOnInit() {
    this.length
    this.obtenerUsuario()
    console.log()
  }

  async obtenerUsuario(){
    let idUsuario = JSON.parse(localStorage.getItem('usuario'))
    await this._serviceUsuario.obtenerUsuario(idUsuario).subscribe(data=>{
      this.usuario = data.usuario.carrito
      console.log(this.usuario)
      this.length = this.usuario.length
    })
    
  }
  
  async eliminar(idProducto){

  let ids = { productoId: idProducto,usuarioId: JSON.parse(localStorage.getItem('usuario')) }
  await this._serviceUsuario.eliminarCarritoProducto(ids).subscribe(data=>{
    console.log(data)
    this.router.navigate(['/cliente/checkout'])
  },error=>{
    console.log(error)
   })
  }
}
