import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((response : HttpErrorResponse)=>{
                
                let message = "hata oluştu";

                if(!navigator.onLine){
                message = "İnternet Bağlantınız Yok";
                throwError(message);
                }


                if(response.error.error){
                    if(response.status == 401){
                        message = "yetkiniz yok";
                        // console.log(response)
                        // return throwError(message);
                    }
                    switch (response.error.error.message) {
                        case "EMAIL_EXISTS":
                        message = "mail adresi kullanılmış";
                        break;
                        case "EMAIL_NOT_FOUND":
                        message = "mail bulunamadı";
                        break;
                        case "INVALID_PASSWORD":
                        message = "Parola Yanlış.";
                        break;
                        case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
                        message = "Çok Fazla Giriş Denemesi Yapıldı. Lütfen daha sonra tekrar deneyin.";
                        break;
                        default:
                        message;
                        break;
                    }
                }
                return throwError(message)
            })
        )
    }
}