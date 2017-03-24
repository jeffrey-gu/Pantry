import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IonPullUpFooterState} from 'ionic-pullup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    footerState: IonPullUpFooterState;
    public foodthings = [{title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}, {title:"pickle", selected: false},{title:"chicken", selected: false},{title:"bread", selected: false},{title:"eggs", selected: false},
    {title:"cheese", selected: false}, {title:"apple", selected: false}];
    public selected = [];
    public anySelected : boolean = false;

    constructor(public navCtrl: NavController) {
      this.footerState = IonPullUpFooterState.Collapsed;
    }

    /******FOR FOOTER*****/
    footerExpanded() {
      console.log('Footer expanded!');
    }

    footerCollapsed() {
      console.log('Footer collapsed!');
    }

    toggleFooter() {
      this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    }

    /******FOR SELECTION MODE*****/
  multicheckTap(food){
    //checks if item is already selected
    var index = this.selected.indexOf(food);
    if(index > -1){
      this.selected.splice(index, 1);
      food.selected = false;
    }
    else {
      this.selected.push(food);
      food.selected = true;
    }

    //checks if any items are selected
    if(this.selected.length == 0){
      this.anySelected = false;
    }
    else {
      this.anySelected = true;
    }      
  }

}
