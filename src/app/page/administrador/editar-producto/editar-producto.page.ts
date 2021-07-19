import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductoService } from '../../../services/producto.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {

  @Input() id: string;
  @Input() nombre: string;

  idProducto: string 
  PRODUCTO: any = {}
  formularioActualizacion: FormGroup

  constructor(
    private modalController: ModalController,
    private _serviceProducto: ProductoService,
    public loadingComponent: LoadingComponent,
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
      console.log(error)
    })
  }

  actualizarProducto(){
    let productoActualizado = this.formularioActualizacion.value
    console.log(productoActualizado)
    this._serviceProducto.actualizarProducto(this.idProducto,productoActualizado).subscribe(data=>{
      this.obtenerProducto()      
    },error=>{

    })
  }


  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
 