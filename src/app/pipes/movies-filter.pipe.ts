import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../model/movie';

@Pipe({
  name: 'moviesFilter'
})
export class MoviesFilterPipe implements PipeTransform {

  transform(movies : Movie[], filterText : string) : Movie[] {
    filterText = filterText.toLowerCase();

    console.log(movies);
    console.log(filterText);

    return filterText? movies.filter((m : Movie) => m.title.toLowerCase().indexOf(filterText) !== -1 || m.description.toLowerCase().indexOf(filterText) !== -1): movies;
  }

}
