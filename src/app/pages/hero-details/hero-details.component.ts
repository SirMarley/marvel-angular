import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {

  id:any;
  sub:any;

  hero:any;

  constructor(private route: ActivatedRoute, public service:SharedService, private router: Router) {
    if(this.service.superHeroes.length < 1){
      this.router.navigate(['/home']);
    }
    this.service.comics = [];
    this.service.series = [];
    this.service.stories = [];
  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      let index = this.service.findIndex(this.service.superHeroes, parseInt(this.id));
      if(index > -1){
        this.hero = this.service.superHeroes[index];
        this.getDetails();
      }
    })
  }

  getDetails(){

    this.callAPI('characters/' + this.id + '/comics?limit=100&offset=0&', 'comics');
    this.callAPI('characters/' + this.id + '/series?limit=100&offset=0&', 'series');
    this.callAPI('characters/' + this.id + '/stories?limit=100&offset=0&', 'stories');

  }

  callAPI(extraUrl:string, name:string){
    this.service.callGetService(extraUrl).subscribe((resp:any) => {
      console.log(resp);
      switch (name){
        case 'comics':
          this.service.comics = this.processData('comics', resp.data.results);
          this.service.comicsBU = this.service.comics;
          break;
        case 'series':
          this.service.series = this.processData('series', resp.data.results);
          this.service.seriesBU = this.service.series;
          break;
        default:
          this.service.stories = this.processData('stories', resp.data.results);
          this.service.storiesBU = this.service.stories;
        break;
      }

    }, (error) => {
      console.log(error);
    })
  }

  processData(str:string, obj:any){
    if(str == 'comics'){
      obj.forEach((el:any) => {
        if(el.images.length > 0){
          el.picture = el.images[0].path + '.' + el.images[0].extension;
        } else {
          el.picture = '';
        }
      });
      return obj;
    } else {
      obj.forEach((el:any) => {
        if(el.thumbnail != {} && el.thumbnail != null){
          el.picture = el.thumbnail.path + '.' + el.thumbnail.extension;
        } else {
          el.picture = '';
        }
      });
      return obj;
    }

  }

}
