import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../model/movie';
import { MovieRepository } from '../model/movie.repository';
import { AlertifyService } from '../services/alertify.service';
import { MovieService } from '../services/movie.service';

declare let alertify : any;


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers : [MovieService]
})
export class MoviesComponent implements OnInit {

  
  
  title = "Film Listesi";
  movies : Movie[] = [] ;
  popularMovies : Movie[] = [];
  // movieRepository : MovieRepository;
  // today = new Date;
  filterText : string = "";
  filteredMovies : Movie[] = [];
  error : any;

  loading : boolean = false;
  
  
  constructor(
    private alertify : AlertifyService, 
    private movieService : MovieService,
    private activatedRoute : ActivatedRoute) {
      // this.movieRepository = new MovieRepository();
      // this.movies = this.movieRepository.getMovies();
      // this.popularMovies = this.movieRepository.getPopularMovies();
    }
  
  
    ngOnInit(): void {
      this.activatedRoute.params.subscribe( params => {

        this.loading = true;

        this.movieService.getMovies(params["categoryId"]).subscribe(data => {
          this.movies = data;
         // this.filterText = this.filterText.toLowerCase();
          this.filteredMovies = this.movies;
          this.loading = false;
        },error => {
           this.error = error,
           this.loading = true
        });
      });

    
    }




   onInputChange(){
      this.filteredMovies = this.filterText?
       this.movies.filter(u => u.title.toLowerCase().indexOf(this.filterText) !== -1 ||
                          u.description.toLowerCase().indexOf(this.filterText) !== -1 ) : this.movies;
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
