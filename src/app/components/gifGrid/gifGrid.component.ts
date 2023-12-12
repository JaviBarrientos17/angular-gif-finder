// gifGrid.component.ts

import { Component, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'gifGrid-component',
  templateUrl: './gifGrid.component.html',
  styleUrls: ['./gifGrid.component.css'],
})
export class GifGridComponent implements OnInit {
  gifs: any[] = [];
  searchQuery: string = '';
  isSearching: boolean = false;
  noResultsMessage: string | null = null; // Nuevo campo para el mensaje
  loadingMore: boolean = false;
  offset: number = 0; // Nuevo campo para manejar la paginación

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    // Cargar trending GIFs al inicializar el componente
    this.loadTrendingGifs();
  }

  search(): void {
    if (this.searchQuery.trim() === '') {
      // Si la búsqueda está vacía, cargar trending GIFs
      this.loadTrendingGifs();
      return;
    }

    this.isSearching = true;
    this.noResultsMessage = null; // Reiniciar el mensaje
    this.offset = 0; // Reiniciar el offset para la búsqueda

    this.giphyService.searchGifs(this.searchQuery, this.offset).subscribe(
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

  private loadTrendingGifs(): void {
    this.isSearching = true;
    this.noResultsMessage = null;

    this.giphyService.getTrendingGifs().subscribe(
      (response) => {
        this.gifs = response.data;

        // Verificar si no hay resultados
        if (this.gifs.length === 0) {
          this.noResultsMessage = 'No se encontraron trending GIFs.';
        }

        this.isSearching = false;
      },
      (error) => {
        console.error('Error fetching trending gifs', error);
        this.isSearching = false;
      }
    );
  }

  onScroll(): void {
    const element = document.documentElement;
    const scrollHeight = element.scrollHeight;
    const scrollTop = element.scrollTop;
    const clientHeight = element.clientHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 200 &&
      !this.isSearching &&
      !this.loadingMore
    ) {
      this.loadMoreGifs();
    }
  }

  loadMoreGifs(): void {
    this.loadingMore = true;

    // Lógica para cargar más GIFs aquí
    this.offset += 25; // Ajusta el valor según la paginación de la API

    this.giphyService.searchGifs(this.searchQuery, this.offset).subscribe(
      (response) => {
        const newGifs = response.data;

        // Verificar si hay nuevos resultados
        if (newGifs.length > 0) {
          this.gifs = [...this.gifs, ...newGifs];
        } else {
          // Si no hay más resultados, puedes desactivar la funcionalidad de carga
          // o mostrar un mensaje indicando que no hay más resultados.
        }

        this.loadingMore = false;
      },
      (error) => {
        console.error('Error fetching more gifs', error);
        this.loadingMore = false;
      }
    );
  }
}
