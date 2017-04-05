import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Food provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Food {

	public foodthings= [];
	
	constructor() {
    interface food {
        name: string;
        imageURL: string;
        selected:  boolean;
        recipeSelected: boolean;
        pantrySelected:  boolean;
      }
      
      function pantryRequestListener () {
      this.foodthings= JSON.parse(this.responseText)['food'];
      console.log("one");
      console.log(this.foodthings[0].name);
      console.log("two");
      }
       var request = new XMLHttpRequest();
       
    request.onload = pantryRequestListener;
    request.open("get", '../testpantry.json', true);
    request.send();
		//GET REQUEST
/*
<<<<<<< HEAD
		//this.foodthings = [{title:"pickle"},{title:"chicken"},{title:"bread"},{title:"eggs"},{title:"cheese"}];
=======
		this.foodthings = [{title:"Apple", imageURL: "https://staticdelivery.nexusmods.com/mods/110/images/74627-0-1459502036.jpg"},
                         {title:"Durian", imageURL: "http://foodnsport.com/assets/images/articles/durian600square.jpg"},
                         {title:"Banana", imageURL: "http://www.clker.com/cliparts/f/1/d/9/13683029131592382225bananas-icon-md.png"},
                         {title:"Watermelon", imageURL: "http://www.clker.com/cliparts/f/1/d/9/13683029131592382225bananas-icon-md.png"},
                         {title:"Coconut", imageURL: "http://www.clker.com/cliparts/f/1/d/9/13683029131592382225bananas-icon-md.png"},
                         {title:"Fish", imageURL: "http://www.clker.com/cliparts/f/1/d/9/13683029131592382225bananas-icon-md.png"}];
>>>>>>> origin/ionic-team
*/
		for(var i in this.foodthings){
      console.log(this.foodthings[i].name);
			this.foodthings[i]['recipeSelected'] = false;
			this.foodthings[i]['pantrySelected'] = false;
		}
	}

	filterItems(searchQuery){
		console.log("food filtering");
		return this.foodthings.filter((food) => {
			return food.title.indexOf(searchQuery.toLowerCase()) > -1;
		});
	}

}
