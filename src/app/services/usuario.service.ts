import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  urlServidorLocal = "http://localhost:3000"

  urlServidor = "https://restaurante0contacto.herokuapp.com"


url  = 'https://restaurante0contacto.herokuapp.com/api/'

  as = 'http://localhost:3000/api/'

  constructor(
    private http: HttpClient
  ) { }

  /* AQUI REGISTRAMOS EL USUARIO */
signup(usuario:Usuario):Observable<any>{
  return this.http.post(`${this.url}autenticacion/signup`,usuario)
}

/* Aqui hacemos el login */
signin(usuario:Usuario):Observable<any>{
  return this.http.post(`${this.url}autenticacion/signin`,usuario)
}


/* Aqui el cliente puede actualizar su propio usuario sin password ni rol*/

actualizarCliente(id:any,usuario:any):Observable<any>{
  return this.http.put(`${this.url}usuario/${id}`,usuario)
}

/* Obtener un solo usuario con la id que se obtiene con la contraseña y el email */

obtenerUsuario(id:any):Observable<any>{
  return this.http.get(`${this.url}usuario/${id}`)
}



subirActualizarImgPerfil(blobData,name,ext,id):Observable<any>{

  const formData = new FormData()
  formData.append('imagen', blobData, `${name}.${ext}`)

  return this.http.put(`${this.url}usuario/upload/${id}`,formData)
}







/* aqui bajao se usa para los carritos de los productos */

agregarCarritoProducto(ids:any):Observable<any>{
  return this.http.post(`${this.url}usuario/agregar/`,ids)
}

eliminarCarritoProducto(ids:any){
  return this.http.post(`${this.url}usuario/eliminar/`,ids)
}



}
