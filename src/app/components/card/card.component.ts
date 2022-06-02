import { SharedService } from './../../services/shared.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() cardName: string = "";
  @Input() cardPicture: string = "";
  @Input() cardId: string = "";
  @Input() cardFavorite: boolean = false;
  @Input() index:number = -1;

  deleting:boolean = false;

  constructor(public service:SharedService) { }

  goToDetails(id:string, editMode:boolean){

  }

  selectItem(){
    this.service.selectedItem = this.index;
  }

  favoriteHero(id:string){
    const findUser = this.service.findIndex(this.service.superHeroes, parseInt(id));
    this.favoriteHeroInArray(findUser, this.service.superHeroes);
  }

  favoriteHeroInArray(index:number, arr:any){
    if(arr[index]['favorite'] == true){
      arr[index]['favorite'] = false;
      this.saveInLocalStorage('favorites', arr[index], 'deleteFavorite');
      return;
    }
    arr[index]['favorite'] = true;
    this.saveInLocalStorage('favorites', arr[index], 'addFavorite');
  }



  saveInLocalStorage(arrName:string, obj:any, action:string){
    let localStorageObj = JSON.parse(localStorage[this.service.userName]);

    if(localStorageObj){
      let arrInObject = this.checkInObject(arrName, localStorageObj);
      switch (action){
        case 'addFavorite':
          localStorageObj[arrName].push(obj);
          break;
        case 'deleteFavorite':
          let favIndexed = this.service.findIndex(arrInObject, obj.id);
          localStorageObj[arrName].splice(favIndexed, 1);
          break;
        default:
          localStorageObj['deleted'].push(obj);
        break;
      }
      localStorage[this.service.userName] = JSON.stringify(localStorageObj);
    }
  }

  checkInObject(name:string, obj:any){
    return obj[name];
  }

  /* Actions */

  removeActive(){
    this.service.selectedItem = -1;
  }

  editHero(id:string){
    let index = this.service.findIndex(this.service.superHeroes, parseInt(id));
    this.service.hero = this.service.superHeroes[index];
    this.service.editing = true;

  }

  confirmDeletion(){
    let index = this.service.findIndex(this.service.superHeroes, parseInt(this.cardId));
    if(index > -1){
      this.saveInLocalStorage('deleted', this.service.superHeroes[index], 'deleted');
      this.service.superHeroes.splice(index, 1);
      this.service.selectedItem = -1;
    }
  }

}
