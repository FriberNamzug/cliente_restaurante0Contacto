import { Component, Input, OnInit, } from '@angular/core';
import { ModalController, } from '@ionic/angular';
import { ProductoService } from '../../services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../../components/alert/alert.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { CameraSource ,CameraResultType, Camera} from '@capacitor/camera';
import { Url } from '../../class/url';
import { Toast } from '@ionic-native/toast/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

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
    public alertComponent: AlertComponent,
    public toastComponent: ToastComponent,
    public formBuilder: FormBuilder,
    public url: Url,
    private spinnerDialog: SpinnerDialog,
    private toast: Toast,
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

  obtenerProducto(){
    this.spinnerDialog.show(`Obteniendo ${this.nombre}`)
    this._serviceProducto.obtenerProducto(this.idProducto).subscribe(data=>{
      this.spinnerDialog.hide()
      this.PRODUCTO = data.producto
      this.PRODUCTO.imagenUrl = this.url.url + data.producto.imagenUrl
      this.formularioActualizacion.setValue({
        nombre: this.PRODUCTO.nombre,
        categoria: this.PRODUCTO.categoria,
        descripcion: this.PRODUCTO.descripcion,
        precio: this.PRODUCTO.precio,
      })
      
    },error=>{
      this.spinnerDialog.hide()
      this.alertComponent.alerta('Error',error.error)
      console.log(error)
    })
  }

  actualizarProducto(){
    this.spinnerDialog.show(`Actualizando ${this.nombre}`)
    let productoActualizado = this.formularioActualizacion.value
    console.log(productoActualizado)
    this._serviceProducto.actualizarProducto(this.idProducto,productoActualizado).subscribe(data=>{
      this.spinnerDialog.hide()
      this.toast.show(data.message,this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(data=>{
        console.log(data)
      })
      this.obtenerProducto()      
    },error=>{
      this.spinnerDialog.hide()
      this.alertComponent.alerta('error',error.error)
    })
  }

  async subirFoto(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    })
    this.spinnerDialog.show('Actualizando imagen del producto...')

  console.log('Imagen: ', image)
  const blobData = this.b64toBlob(image.base64String, `image/${image.format}`)    
  const imageName = 'nombreQueLePonemosantes de la extension'
  
  this._serviceProducto.subirImagenProducto(blobData,imageName,image.format,this.idProducto).subscribe(data=>{
      this.spinnerDialog.hide()
      this.toast.show(data.message, this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(data=>{
        console.log(data)
      })
      this.obtenerProducto()
      
    },error =>{
      this.spinnerDialog.hide()
      this.alertComponent.alerta('error',error)
      console.error(error)
    })
    

  }

  async obtenerGaleria(){


  }









  async dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });

  }
















  
    // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
