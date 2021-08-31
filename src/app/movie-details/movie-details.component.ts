import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../model/movie';
import { AlertifyService } from '../services/alertify.service';
import { MovieService } from '../services/movie.service';

declare let alertify : any;

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers: [MovieService]
})
export class MovieDetailsComponent implements OnInit {
  
  movie : Movie;
  error : any;
  loading : boolean = false;
  
  constructor(
    private movieService : MovieService,
    private activatedRoute : ActivatedRoute,
    private alertify : AlertifyService) { }

  ngOnInit(): void {
    
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.movieService.getMovieById(params["movieId"]).subscribe( data => {
        this.movie = data;
        this.loading = false;
      })
    })
  }

  addToList($event : any, movie : Movie){
    if($event.target.classList.contains('btn-success')){
      $event.target.innerText = "Remove in List";
      $event.target.classList.remove('btn-success')
      $event.target.classList.add('btn-danger')
      this.alertify.success(movie.title + " Listeye Eklendi")
    } else {
     $event.target.innerText = "Add List";
     $event.target.classList.remove('btn-danger')
     $event.target.classList.add('btn-success')
     this.alertify.error(movie.title + " Listeden Çıkarıldı")
    }
  }

}
