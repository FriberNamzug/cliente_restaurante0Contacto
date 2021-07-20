import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url } from '../class/url';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    adicion = 'api/productos/'

  constructor(
    private http: HttpClient,
    private url: Url
  ) { }

obtenerProductos():Observable<any>{
  return this.http.get(this.url.url+this.adicion)
}

obtenerProducto(id:any):Observable<any>{
  return this.http.get(`${this.url.url}${this.adicion}${id}`)
}

crearProducto(producto:any):Observable<any>{
  return this.http.post(this.url.url+this.adicion,producto)
}

actualizarProducto(id:any,producto:any):Observable<any>{
  return this.http.put(`${this.url.url}${this.adicion}${id}`,producto)
}

eliminarProducto(id:any):Observable<any>{
  return this.http.delete(`${this.url.url}${this.adicion}${id}`)
}


subirImagenProducto(blobData,name,ext,id):Observable<any>{

  const formData = new FormData()
  formData.append('imagen', blobData, `${name}.${ext}`)

  return this.http.put(`${this.url.url}${this.adicion}upload/${id}`,formData)
}



}
