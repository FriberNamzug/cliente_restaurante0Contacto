import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-url-img-perfil',
  templateUrl: './url-img-perfil.component.html',
  styleUrls: ['./url-img-perfil.component.scss'],
})
export class UrlImgPerfilComponent implements OnInit {

  urlServidor: String = this._serviceUsuario.urlServidor
  photoUploading: String


  constructor(
  public _serviceUsuario: UsuarioService,
    ) {}

  ngOnInit() {}

  urlCorrecta(urlErronea){
    return  this.photoUploading =  `${this.urlServidor}/${urlErronea.substr(7,6)}/${urlErronea.substr(14,9)}/${urlErronea.substr(24)}`
    }

}


