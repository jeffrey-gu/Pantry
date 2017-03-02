import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController, PopoverController, NavParams } from 'ionic-angular';

@Component({
  template:`
  <ion-row [(ngModel)]="popoverModel"></ion-row>
  `
})
export class PopoverPage {
  background: string;
  contentEle: any;
  textEle: any;
  popoverModel;

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;
    }
  }
}

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  //added this
  public swipe: number = 0;
  @ViewChild('popoverContent', {read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', {read: ElementRef }) text: ElementRef;  
  
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {
  
  }
  //added this
  swipeEvent(e){
    this.swipe++;
  }
/*  showToast(food: string){
    
    this.toast.message =  food;
    this.toast.present();
  }*/
  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }

}
