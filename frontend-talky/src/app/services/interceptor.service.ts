import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private token:string=''

  constructor(private authSvc:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token=localStorage.getItem('talkyLoggedUserToken');
    this.token=token?token:" ";
    
    let modifiedRequest=req.clone({
      headers:new HttpHeaders().append('token',this.token)

    })
    return next.handle(modifiedRequest)

  }
}
