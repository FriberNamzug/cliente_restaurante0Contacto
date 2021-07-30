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
    return this.http.get(`${this.url.url}${this.adicion}/${id}`)
  }
  
  obtenerUsuarios():Observable<any>{
    return this.http.get(`${this.url.url}${this.adicion}/`)
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


deshabilitarUsuario(id:any):Observable<any>{
  return this.http.delete(`${this.url.url}${this.adicion}${id}`)
}

habilitarClienteEmpleado(id:any):Observable<any>{
  return this.http.put(`${this.url.url}${this.adicion}habilitar/${id}`,id)
}

obtenerClientesDeshabilitados():Observable<any>{
  return this.http.get(`${this.url.url}${this.adicion}clientes/deshabilitado/`)
}
obtenerEmpleadoDeshabilitados():Observable<any>{
  return this.http.get(`${this.url.url}${this.adicion}empleados/deshabilitado/`)
}

crearEmpleado(empleado:any):Observable<any>{
  return this.http.post(`${this.url.url}${this.adicion}`,empleado)
}
cambiarRol(id,rol):Observable<any>{
  return this.http.put(`${this.url.url}${this.adicion}cambioderol/id`,rol)
}




/* aqui bajao se usa para los carritos de los productos */

agregarCarritoProducto(ids:any):Observable<any>{
  return this.http.post(`${this.url.url}${this.adicion}agregar/`,ids)
}

eliminarCarritoProducto(ids:any){
  return this.http.post(`${this.url.url}${this.adicion}eliminar/`,ids)
}



}
