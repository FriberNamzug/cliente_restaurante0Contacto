import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormControl,  Validators,  FormBuilder, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/usuario';
import { CameraSource ,CameraResultType, Camera} from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';

import { LoadingComponent } from '../../../components/loading/loading.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ToastComponent } from '../../../components/toast/toast.component';
import { UrlImgPerfilComponent } from '../../../components/url-img-perfil/url-img-perfil.component';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

  formularioActualizacion: FormGroup
  photoUploading: String
  urlServidor: String = this._serviceUsuario.urlServidor
  usuario: any = {}
  carga = false
  photo: SafeResourceUrl

  constructor(
    private toastComponent: ToastComponent,
    private alertComponent: AlertComponent,
    public loadingComponent: LoadingComponent,
    public urlImgPerfilComponent: UrlImgPerfilComponent,

    public domSanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    public router: Router,
    public _serviceUsuario: UsuarioService,

  ) {
    this.formularioActualizacion = this.formBuilder.group({
      'email':    ["",Validators.required],
      'nombre':   ["",Validators.required],
      'apellido': [""],
      'edad':     [""],
      'telefono': ["", Validators.required],
      'recibirPromociones': [""]
    })

   }

  ngOnInit() {
    this.obtenerUsuario()
    this.photoUploading
  }

   obtenerUsuario(){
  //  this.loadingComponent.presentLoading('Cargando datos de usuario')

    let idUsuario = localStorage.getItem('usuario')

   this._serviceUsuario.obtenerUsuario(idUsuario).subscribe(data=>{
    
  //  this.loadingComponent.loading.dismiss()

    this.usuario = data.usuario

    this.formularioActualizacion.setValue({
      email: this.usuario.email,
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      edad: this.usuario.edad,
      telefono: this.usuario.telefono,
      recibirPromociones: this.usuario.recibirPromociones
    })

  this.photoUploading = this.urlImgPerfilComponent.urlCorrecta(this.usuario.imgPerfil)

  
},error=>{
   //   this.loadingComponent.loading.dismiss()
      this.alertComponent.alerta("error",error)
      console.log(error)

    })
  }



  actualizarDatos(){
    this.loadingComponent.presentLoading('Actualizando datos de usuario')

    const datos = this.formularioActualizacion.value

    this._serviceUsuario.actualizarCliente(this.usuario._id,datos).subscribe(data=>{
      console.log(data)
      this.loadingComponent.loading.dismiss()
      this.toastComponent.toast(data.message)
      this.obtenerUsuario()

    },error=>{

      this.loadingComponent.loading.dismiss()
      this.alertComponent.alerta("error",error)
      console.log(error)
    })

  }






  actualizarPassword(){

  }


  async subirFoto(){

    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    })
    this.loadingComponent.presentLoading('Actualizando Fotografia')

  console.log('Imagen: ', image)
  const blobData = this.b64toBlob(image.base64String, `image/${image.format}`)    
  const imageName = 'nombreQueLePonemosantes de la extension'
  
  this._serviceUsuario.subirActualizarImgPerfil(blobData,imageName,image.format,this.usuario._id).subscribe(data=>{
      
      this.loadingComponent.loading.dismiss()
      this.photoUploading =  this.urlImgPerfilComponent.urlCorrecta(data.rutaImg)
    
    
    },error =>{

      this.loadingComponent.loading.dismiss()
      console.error(error)
    })
    

  }




  obtenerGaleria(){
    
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
 