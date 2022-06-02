import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() backLink: string = "";
  @Input() textOnArrow: string = "";

  constructor(private router:Router) { }

  goBack(){
    this.router.navigate([this.backLink]);
  }

}
