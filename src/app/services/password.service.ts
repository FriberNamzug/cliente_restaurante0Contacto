import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { Url } from '../class/url';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(    
    private http: HttpClient,
    private url: Url
    ) { }

    adicion = 'api/usuario/password/'

 
  actualizarPassword(id:any,passwords:any):Observable<any>{
    return this.http.put(`${this.url.url}${this.adicion}${id}`,passwords)
  }
  


}


export const validacionPasswordPair: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('confirmacionPasswordNew');

  return password.value === confirmarPassword.value ? null : { 'noSonIguales': true };
};

