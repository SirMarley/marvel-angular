import { SharedService } from 'src/app/services/shared.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.scss']
})
export class SearchDetailsComponent implements OnInit {

  @Input() nameOfList: string = "";

  constructor(private service:SharedService) { }

  ngOnInit(): void {
  }

  captureInput(e:any){
    const checkProperties = ["title"];
    switch (this.nameOfList){
      case 'comics':
        this.service.comics =  this.service.captureInput(e, checkProperties, this.service.comicsBU);
        break;
      case 'series':
        this.service.series =  this.service.captureInput(e, checkProperties, this.service.seriesBU);
        break;
      default:
        this.service.stories =  this.service.captureInput(e, checkProperties, this.service.storiesBU);
      break;
    }
  }

}
