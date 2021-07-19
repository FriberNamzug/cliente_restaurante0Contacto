import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductoService } from '../../services/producto.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../../components/alert/alert.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.page.html',
  styleUrls: ['./ver-producto.page.scss'],
})

export class VerProductoPage implements OnInit {

  @Input() id: string;
  @Input() nombre: string;


  idProducto: string 
  PRODUCTO: any = {}
  formularioActualizacion: FormGroup
  rolUsuario: string
  constructor(
    private modalController: ModalController,
    private _serviceProducto: ProductoService,
    private _serviceUsuario: UsuarioService,
    public loadingComponent: LoadingComponent,
    public alertComponent: AlertComponent,
    public toastComponent: ToastComponent,
    public formBuilder: FormBuilder,

    ) {
      
      this.formularioActualizacion = this.formBuilder.group({
        'nombre':    ["",Validators.required],
        'categoria':   ["",Validators.required],
        'descripcion': ["",Validators.required],
        'precio':     ["",Validators.required],
        //'imagen':     ["",Validators.required],
      })
  

    }

  ngOnInit() {
    this.idProducto = this.id
    this.obtenerProducto()
    this.rolUsuario = localStorage.getItem('rol')

  }

  async obtenerProducto(){
    await this.loadingComponent.presentLoading(`Obteniendo ${this.nombre}`)
    this._serviceProducto.obtenerProducto(this.idProducto).subscribe(data=>{
      this.loadingComponent.loading.dismiss()
      this.PRODUCTO = data.producto

      this.formularioActualizacion.setValue({
        nombre: this.PRODUCTO.nombre,
        categoria: this.PRODUCTO.categoria,
        descripcion: this.PRODUCTO.descripcion,
        precio: this.PRODUCTO.precio,
      })
      
    },error=>{
      this.loadingComponent.loading.dismiss()
      this.alertComponent.alerta('Error',error.error)
      console.log(error)
    })
  }

  actualizarProducto(){
    this.loadingComponent.presentLoading(`Actualizando ${this.PRODUCTO.nombre}`)
    let productoActualizado = this.formularioActualizacion.value
    console.log(productoActualizado)
    this._serviceProducto.actualizarProducto(this.idProducto,productoActualizado).subscribe(data=>{
      this.loadingComponent.loading.dismiss()
      this.toastComponent.toast(data.message)
      this.obtenerProducto()      
    },error=>{
      this.loadingComponent.loading.dismiss()
      this.alertComponent.alerta('error',error.error)
    })
  }


  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
