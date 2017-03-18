import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  //added this
  public swipe: number = 0;
  
  
  constructor(public navCtrl: NavController) {
  
  }
  //added this
  swipeEvent(e){
    this.swipe++;
  }

}
