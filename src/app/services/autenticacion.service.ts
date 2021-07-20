import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { Url } from '../class/url';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  adicion = 'api/autenticacion/'

  constructor(
    private http: HttpClient,
    private url: Url 
  ) { }


    /* AQUI REGISTRAMOS EL USUARIO */
signup(usuario:Usuario):Observable<any>{
  return this.http.post(`${this.url.url}${this.adicion}signup`,usuario)
}

/* Aqui hacemos el login */
signin(usuario:Usuario):Observable<any>{
  return this.http.post(`${this.url.url}${this.adicion}signin`,usuario)
}


}
