import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  carrito = []
  urlWeb = 'https://restaurante0contacto.herokuapp.com/api/productos/'
  url = 'http://localhost:3000/api/productos/'
  constructor(
    private http: HttpClient
  ) { }

obtenerProductos():Observable<any>{
  return this.http.get(this.url)
}

obtenerProducto(id:any):Observable<any>{
  return this.http.get(`${this.url}${id}`)
}

crearProducto(){

}

actualizarProducto(){

}

eliminarProducto(){

}



}
