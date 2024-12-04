import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { listData } from './shared/list';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements PipeTransform  {
  list = listData.reverse();
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';

  toggleSearch: boolean = false;
  constructor() {
  }

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

@Pipe({
  name: 'filter'
})
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.president.toLowerCase().includes(searchText) || it.party.toLowerCase().includes(searchText) || it.took_office.toLowerCase().includes(searchText);
    });
   }
}

