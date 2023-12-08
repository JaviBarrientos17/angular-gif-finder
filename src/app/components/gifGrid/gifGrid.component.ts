// gifGrid.component.ts

import { Component } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'gifGrid-component',
  templateUrl: './gifGrid.component.html',
  styleUrls: ['./gifGrid.component.css'],
})
export class GifGridComponent {
  gifs: any[] = [];
  searchQuery: string = '';
  isSearching: boolean = false;
  noResultsMessage: string | null = null; // Nuevo campo para el mensaje

  constructor(private giphyService: GiphyService) {}

  search(): void {
    if (this.searchQuery.trim() === '') {
      return; // Evitar búsqueda vacía
    }

    this.isSearching = true;
    this.noResultsMessage = null; // Reiniciar el mensaje

    this.giphyService.searchGifs(this.searchQuery).subscribe(
      (response) => {
        this.gifs = response.data;

        // Verificar si no hay resultados
        if (this.gifs.length === 0) {
          this.noResultsMessage = `No se encontraron resultados para "${this.searchQuery}".`;
        }

        this.isSearching = false;
      },
      (error) => {
        console.error('Error fetching gifs', error);
        this.isSearching = false;
      }
    );
  }
}
