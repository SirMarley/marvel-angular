import { SharedService } from './../../services/shared.service';
import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent{

  superhero:any = {
    name: this.service.hero.name,
    description: this.service.hero.description
  }

  constructor(public service:SharedService) {

  }

  confirmEdition(hro:NgForm){
    const index = this.service.findIndex(this.service.superHeroes, this.service.hero.id);
    this.replaceNameAndDescription(this.service.superHeroes[index], this.superhero);
    let localStorageObj = JSON.parse(localStorage[this.service.userName]);
    let arrInObj = localStorageObj['modified'];
    let indexed = this.service.findIndex(arrInObj, this.service.hero.id);
    if(indexed > -1){
      this.replaceNameAndDescription(arrInObj[indexed], this.superhero);
    } else {
      arrInObj.push(this.service.superHeroes[index]);
    }
    localStorage[this.service.userName] = JSON.stringify(localStorageObj);
    this.service.editing = false;
  }

  replaceNameAndDescription(originalObj:any, modifiedObj:any){
    originalObj.name = modifiedObj.name;
    originalObj.description = modifiedObj.description;
  }

}
