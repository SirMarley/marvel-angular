import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pagesOnArray:number[] = [];

  initialNumber : number = 0;
  lastNumber : number = 100;

  initialDisplayNumber: number = 0;
  lastDisplayNumber: number = 20;

  pageLoading:boolean = true;

  constructor(public service:SharedService, private router:Router) {
    //this.service.userName = 'Reiryu';
    if(!localStorage[this.service.userName]){
      this.router.navigate(['/login']);
    } else {
      if(this.service.superHeroes.length > 1 && this.service.superHeroesBackup.length > 1){
        this.actionsAfterAPI();
      } else {
        this.fetchPage();
      }
    }

  }

  ngOnInit(): void {
  }

  fetchPage(){
    let extraUrl = 'characters?limit=' + this.lastNumber + '&offset=' + this.initialNumber + '&';
    this.service.callGetService(extraUrl).subscribe((resp:any) => {
      this.service.superHeroes = [...this.service.superHeroes, ...resp.data.results];
      if(resp.data['total'] > this.initialNumber + 100){
        this.increaseNumber();
      } else {
        this.actionsAfterAPI();
      }
    }, (error) => {
      console.log(error);
    })
  }

  actionsAfterAPI(){
    this.searchAndReplace();
    this.service.superHeroesBackup = this.service.superHeroes;
    this.pageLoading = false;
    this.createPaginator();
  }

  searchAndReplace(){
    const lsObj = JSON.parse(localStorage[this.service.userName]);
    const favs = lsObj['favorites'];
    const deleted = lsObj['deleted'];
    const modified = lsObj['modified'];

    this.checkDeleted(deleted);

    this.service.superHeroes.find(el => {

      this.checkFavorites(el, favs);

      modified.find((element:any) => {
        if(this.checkIfFound(element.id, el.id)){
          let index = this.service.superHeroes.indexOf(el);
          if(index > -1){
            element.favorite = el.favorite;
            this.service.superHeroes[index] = element;
          }
        }
      })
    });
  }

  checkDeleted(arr:any){
    arr.find((element:any) => {
      this.service.superHeroes = this.service.superHeroes.filter(el => el.id !== element.id);
    })
  }

  checkFavorites(el:any, favs:any){

    favs.find((element:any) => {
      if(this.checkIfFound(element.id, el.id)){
        el.favorite = element.favorite;
      }
    });
  }

  checkIfFound(id1:number, id2:number){
    return id1 === id2;
  }

  increaseNumber(){
    this.initialNumber += 100;
    this.fetchPage();
  }

  captureInput(e:any){
    const checkProperties = ["name"];
    this.service.superHeroes =  this.service.captureInput(e, checkProperties, this.service.superHeroesBackup);
    this.createPaginator();
  }

  paginator(num:number){
    this.lastDisplayNumber = 20 * (num + 1);
    this.initialDisplayNumber = this.lastDisplayNumber - 20;

    window.scroll(0,0);
  }

  createPaginator(){
    let num = this.service.superHeroes.length/20;
    let realNum = Math.trunc(num);
    if(num > realNum){
      realNum = realNum + 1;
    }
    this.pagesOnArray = [...Array(realNum).keys()];
  }



}
