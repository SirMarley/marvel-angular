import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  publicAPIKey: string = "apikey=97f2cd7c3b930daea562931e84ff5f39";
  url: string = "https://gateway.marvel.com:443/v1/public/"
  extraUrl: string = "";

  public superHeroes : any[] = [];
  public superHeroesBackup : any[] = [];

  editing:boolean = false;

  userName:string = "";

  selectedItem:number = -1;

  hero:any = {};

  comics:any[] = [];
  series:any[] = [];
  stories:any[] = [];

  comicsBU:any[] = [];
  seriesBU:any[] = [];
  storiesBU:any[] = [];

  constructor(private http: HttpClient, ) { }

  getQuery(query:string){
    const url = this.url + query + this.publicAPIKey;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, {headers});
  }

  callGetService(extraUrl:string){
    return this.getQuery(extraUrl).pipe(map ((resp:any) => {
      return resp;
    }));
  }



  captureInput(e:any, arr:string[], objBackup:any){
    let inputSearch = e.target.value;
    const checkProperties = arr;
    let searchRegex: any;
    if (!inputSearch) {
      console.log(objBackup);
      return objBackup;
    }
    searchRegex = new RegExp(inputSearch, 'gi');
    const filteredTransactionsData = objBackup.filter((item: any)=> {
      return checkProperties.some(property => {
        return item[property].match(searchRegex);
      })
    })
    return filteredTransactionsData;
  }

  findIndex(arr:any, toCheckId:number){
    return arr.findIndex((x:any) => x.id == toCheckId);
  }
}
