import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { Url } from '../class/url';

@Injectable({
  providedIn: 'root' 
})

export class UsuarioService {


 adicion = 'api/usuario/'


  constructor(
    private http: HttpClient,
    private url: Url

  ) { }


  
  
  obtenerUsuario(id:any):Observable<any>{
    return this.http.get(`${this.url.url}${this.adicion}usuario/${id}`)
  }
  
  
  obtenerClientes():Observable<any>{
    return this.http.get(`${this.url.url}${this.adicion}clientes/`)
  }
  
  obtenerEmpleados():Observable<any>{
    return this.http.get(`${this.url.url}${this.adicion}empleados/`)
  }
  
  
  actualizarCliente(id:any,usuario:any):Observable<any>{
    return this.http.put(`${this.url.url}${this.adicion}${id}`,usuario)
  }


subirActualizarImgPerfil(blobData,name,ext,id):Observable<any>{

  const formData = new FormData()
  formData.append('imagen', blobData, `${name}.${ext}`)

  return this.http.put(`${this.url.url}${this.adicion}upload/${id}`,formData)
}









/* aqui bajao se usa para los carritos de los productos */

agregarCarritoProducto(ids:any):Observable<any>{
  return this.http.post(`${this.url.url}${this.adicion}agregar/`,ids)
}

eliminarCarritoProducto(ids:any){
  return this.http.post(`${this.url.url}${this.adicion}eliminar/`,ids)
}



}
