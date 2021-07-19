import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    url = 'https://restaurante0contacto.herokuapp.com/api/productos/'
  //  url = 'http://localhost:3000/api/productos/'

  constructor(
    private http: HttpClient
  ) { }

obtenerProductos():Observable<any>{
  return this.http.get(this.url)
}

obtenerProducto(id:any):Observable<any>{
  return this.http.get(`${this.url}${id}`)
}

crearProducto(producto:any):Observable<any>{
  return this.http.post(this.url,producto)
}

actualizarProducto(id:any,producto:any):Observable<any>{
  return this.http.put(`${this.url}${id}`,producto)
}

eliminarProducto(id:any):Observable<any>{
  return this.http.delete(`${this.url}${id}`)
}



}
