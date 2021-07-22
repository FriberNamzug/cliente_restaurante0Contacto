import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormControl,  Validators,  FormBuilder,ValidationErrors,ValidatorFn, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ModalController,IonRouterOutlet } from '@ionic/angular';

/* COMPONENTES */
import { AlertComponent } from '../../../components/alert/alert.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { ProductoService } from '../../../services/producto.service';
import { VerProductoPage } from '../../ver-producto/ver-producto.page';

/* CLASES */
import { Url } from '../../../class/url';

/* NATIVE */
import { Toast } from '@ionic-native/toast/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  formularioNuevoProducto: FormGroup
  PRODUCTOS: any = []
  PRODUCTO: any = {}

  constructor(

    private alertComponent: AlertComponent,
    public formBuilder: FormBuilder,
    private routerOutlet: IonRouterOutlet,
    public router: Router,
    public url: Url,

    public _serviceUsuario: UsuarioService,
    public _serviceProducto: ProductoService,
    public toastComponent: ToastComponent,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public modalController: ModalController,
    private spinnerDialog: SpinnerDialog,
    private toast: Toast,
    private vibration: Vibration,

  ) { 
 
    this.formularioNuevoProducto = this.formBuilder.group({
      'nombre':    ["",Validators.required],
      'categoria':   ["",Validators.required],
      'descripcion': ["",Validators.required],
      'precio':     ["",Validators.required],
      //'imagen':     ["",Validators.required],
    })

  }

  ngOnInit() {
    this.obtenerProductos()
  }

  doRefresh(event) {
    this.obtenerProductos()
    this.vibration.vibrate(500);
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }



  agregarProducto(){
    this.spinnerDialog.show('Agregando Producto...')
    let producto = this.formularioNuevoProducto.value
    this._serviceProducto.crearProducto(producto).subscribe(data=>{
      this.spinnerDialog.hide()
      this.toast.show(data.message,this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(data=>{
        console.log(data)
      })
      this.obtenerProductos()
      this.formularioNuevoProducto.reset()
    },error=>{
      this.spinnerDialog.hide()
      this.alertComponent.alerta(error.error)
      this.formularioNuevoProducto.reset()
    })
  }

  agregarImagen(){

  }

  async verProducto(idProducto){
  //  console.log(idProducto)

    this._serviceProducto.obtenerProducto(idProducto).subscribe(data=>{
      this.PRODUCTO = data.producto
    })

    const actionSheet = await this.actionSheetController.create({
      header: `Opciones`,
      cssClass: 'my-custom-class',
      buttons: [{
        text: `Ver y Editar`,
        icon: 'heart',
        handler: () => {


          this.verProductoModal()


        }
      },
      {
        text: 'Borrar',
        icon: 'trash',
        handler: () => {


          this.alertaBorradoProducto(`${this.PRODUCTO.nombre}`,idProducto)


        }
      },
       {
        text: 'Cancel',
        icon: 'close',
      }]
    });
    await actionSheet.present();


  }



 async obtenerProductos(){
   this.spinnerDialog.show('Obteniendo productos...')
    this._serviceProducto.obtenerProductos().subscribe(data=>{
      this.spinnerDialog.hide()
      this.PRODUCTOS = data.productos
      
    },error=>{
      this.spinnerDialog.hide()
      this.alertComponent.alerta(error.error)
    })
  }



  async alertaBorradoProducto(nombre:string,id:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `ATENCION!`,
      message: `Estas seguro que quieres eliminar <strong>${nombre}</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
        }, {
          text: 'Eliminar',
          handler: () => {
               this._serviceProducto.eliminarProducto(id).subscribe(data=>{
                this.toast.show(data.message,this.toastComponent.tiempo,this.toastComponent.ubicacion).subscribe(data=>{
                  console.log(data)
                })
                 this.obtenerProductos()
              }, error=>{
                this.alertComponent.alerta(error.error)
              //  console.log(error)
              })
          }
        }
      ]
    });
  
    await alert.present();
  }
  



  async verProductoModal() {
    const modal = await this.modalController.create({
      component: VerProductoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': this.PRODUCTO._id,
        'nombre': this.PRODUCTO.nombre
      },
      animated:true,
      keyboardClose:true
    });
    modal.onDidDismiss().then((data) => {
      //console.log(data)
      this.obtenerProductos()
  });
    
    return await modal.present();

  }




}
