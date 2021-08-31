import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuards } from './guards/auth.guards';
import { MoviesHomeComponent } from './movies/movies-home/movies-home.component';

const routes : Routes = [
  {path : '', redirectTo : 'movies', pathMatch : 'full'},
  {
    path : 'movies',
    component : MoviesHomeComponent,
    canActivate : [AuthGuards],
    children : [
        {path : '', component : MoviesComponent},
        {path : 'create', component : MovieCreateComponent},
        {path : 'category/:categoryId', component : MoviesComponent},
        {path : ':movieId', component : MovieDetailsComponent},
    ]
  },
  {path : 'categories/create', component : CategoryCreateComponent, canActivate : [AuthGuards]},
  {path : 'auth', component : AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
