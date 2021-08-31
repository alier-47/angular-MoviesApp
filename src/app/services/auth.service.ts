import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from '../model/AuthResponse';
import { User } from '../model/user';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = "AIzaSyA6FeYJhsryxQ4l4DJslruxAQvgxtUcRt4";
  // user = new Subject<User>(); // Observable nin daha geniş hali. user üzerinden birden çok fonksiyonla user içindeki bilgileri gözlemleyebilir.
  user = new BehaviorSubject<User>(null); // subjecten farkı bir önceki veriyi alabilmesi. örn. next subscrible edilir subscribleden önceki next'e ulaşılır. 


  constructor(private http : HttpClient, private router : Router) { }

  signup(email : string, password : string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key, {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(
      tap(response => {
       this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      })
    )
  }

  login(email : string, password : string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(
      tap(response => {
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      })
    )
  }


  logout(){
    this.user.next(null);
    localStorage.removeItem("user");
    this.router.navigate(['/auth'])
  }

  autoLogin(){
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
      return;
    }
    
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  handleAuthentication(email : string, userId : string, token : string, expiresIn : number){
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))
    const user = new User(
      email,
      userId,
      token,
      expirationDate  
    );
    this.user.next(user);

    localStorage.setItem("user", JSON.stringify(user));
  }
}

