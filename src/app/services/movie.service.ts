import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Movie } from '../model/movie';

@Injectable()
export class MovieService {
  [x: string]: any;

  url = "http://localhost:3000/movies";
  url_firebase = "https://angular-movie-app-fbe47-default-rtdb.firebaseio.com/";
  

  constructor(private http : HttpClient) { }

  getMovies(categoryId : number): Observable<Movie[]> {

    return this.http.get<Movie[]>(this.url_firebase + "movies.json")
    .pipe( map(response => {  // gelen datanın içindeki verileri kontrol etmemizi ( istediğimizi değiştirmemizi) sağlar
      const movies : Movie[] = [];

      for(const key in response){
        if(categoryId){
          if(categoryId === response[key].categoryId){
            movies.push({...response[key], id : key});
          }
        }else{
            movies.push({...response[key],id : key});
          }
        }
      return movies;
    }), 
   
      tap(data => console.log(data)),
      catchError(this.handleError),
      delay(500)
    );
  }

  getMovieById(movieId : number) : Observable<Movie> {
    return this.http.get<Movie>(this.url_firebase + "/movies/" + movieId + ".json")
    .pipe(
      tap(data => console.log(data)),
      catchError(this.handleError),
      delay(500)
    );
  }

  createMovie(movie : Movie) : Observable<Movie>{
    return this.http.post<Movie>(this.url_firebase + '/movies.json', movie).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.log("error : " + error.error.message)
    }else{
      switch (error.status) {
        case 404:
          console.log("not found")
          break;
        case 403:
          console.log("access denied")
          break;
        case 500:
          console.log("interval server")
          break;
      
        default:
          console.log("Bilinmeyen Bir Hata Oluştu.")
          break;
      }
    }
    return throwError("Bir Hata Oluştu");
    
  }



}
