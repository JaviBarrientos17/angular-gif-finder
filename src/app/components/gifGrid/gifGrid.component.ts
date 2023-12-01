import { Component, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'gifGrid-component',
  templateUrl: './gifGrid.component.html',
  styleUrls: ['./gifGrid.component.css'],
})
export class GifGridComponent implements OnInit {
  gifs: any[] = [];

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    this.search('panda');
  }

  search(query: string): void {
    this.giphyService.searchGifs(query).subscribe((response) => {
      this.gifs = response.data;
    });
  }
}
