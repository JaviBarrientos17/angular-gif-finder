import { Component, OnInit } from '@angular/core';
import { GiphyService } from './giphy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-gif-finder';
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
