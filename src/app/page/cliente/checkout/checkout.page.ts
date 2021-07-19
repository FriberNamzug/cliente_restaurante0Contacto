import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { NavController  } from '@ionic/angular';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { ToastComponent } from '../../../components/toast/toast.component';
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
    public navCtrl: NavController,
    public loadingComponent: LoadingComponent,
    public toastComponent: ToastComponent
  ) { }

  ngOnInit() {
    this.obtenerUsuario()
  }

 obtenerUsuario(){
    let idUsuario = localStorage.getItem('usuario')
    this._serviceUsuario.obtenerUsuario(idUsuario).subscribe(data=>{

     this.usuario =  data.usuario.carrito
     this.length  = data.usuario.carrito.length 

    })
    
  }
  
eliminar(idProducto){
  
    this.loadingComponent.presentLoading("Eliminando Producto del carrito")
    let ids = { productoId: idProducto,usuarioId: localStorage.getItem('usuario') }

    this._serviceUsuario.eliminarCarritoProducto(ids).subscribe((data:any) => {
      
      this.loadingComponent.loading.dismiss()
      this.obtenerUsuario()
      let carritoAnterior = localStorage.getItem('carrito')
      let carritoActual = parseFloat(carritoAnterior) - 1

      localStorage.setItem('carrito',carritoActual.toString()) //con localStorage guardamos el dato en el navegador
      this.toastComponent.toast(data.message)

  },error=>{
    console.log(error)
   })
  }
}
