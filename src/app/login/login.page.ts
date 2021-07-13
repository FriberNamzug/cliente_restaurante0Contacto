import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormControl,  Validators,  FormBuilder, Form} from '@angular/forms'
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { LoadingComponent } from '../components/loading/loading.component';
import { AlertComponent } from '../components/alert/alert.component';
import { ToastComponent } from '../components/toast/toast.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  formularioLogin: FormGroup

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public _serviceUsuario: UsuarioService,
    private toastComponent: ToastComponent,
    private loadingComponent: LoadingComponent,
    private alertComponent: AlertComponent
    ) { 

      this.formularioLogin = this.formBuilder.group({
        'email':    ["",Validators.required],
        'password': ["",Validators.required]
      })

    }

  ngOnInit() {
  }


  async ingresar(){
     this.loadingComponent.presentLoading('Autenticando...')

    /* Validamos que se haya escrito en el login */
    if(this.formularioLogin.invalid){
      console.log("Campos vacios, llenalos!!!!")
      //mandamos alerta
      this.alertComponent.alerta("Error",'Campos vacios, llenalos!')
      this.loadingComponent.loading.dismiss()

    }
//////////////////////////////////////////

  let datos = this.formularioLogin.value
  
  await this._serviceUsuario.signin(datos).subscribe(data=>{

    let rol = data.usuario.usuarioEncontrado.rol
    if(rol === 'cliente'){
      localStorage.setItem('usuario',data.usuario.usuarioEncontrado._id) //con localStorage guardamos el dato en el navegador
      //console.log(data)
      /* Una notificacion de bienvenido */

      this.toastComponent.toast(`Bienvenido ${data.usuario.usuarioEncontrado.nombre}`)
      this.router.navigate(['/cliente/inicio'])
    }if(rol === 'empleado'){

      localStorage.setItem('usuario',data.usuario.usuarioEncontrado._id) //con localStorage guardamos el dato en el navegador
      
      /* Una notificacion de bienvenido */
      this.toastComponent.toast(`Bienvenido ${data.usuario.usuarioEncontrado.nombre}`)
      this.router.navigate(['/empleado/area-trabajo'])

    }if(rol === 'administrador'){

      localStorage.setItem('usuario',data.usuario.usuarioEncontrado._id) //con localStorage guardamos el dato en el navegador
      
      /* Una notificacion de bienvenido */
      this.toastComponent.toast(`Bienvenido ${data.usuario.usuarioEncontrado.nombre}`)
      this.router.navigate(['/administrador/panel-control'])
      
    }
    this.loadingComponent.loading.dismiss()
    

   },error=>{
    this.loadingComponent.loading.dismiss()
    this.alertComponent.alerta("Error",error.error.message)
    this.formularioLogin.reset()
    console.log(error)

   })


  }

}
