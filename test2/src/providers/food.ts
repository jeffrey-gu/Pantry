import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the Food provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Food {
  public recipeDetails = [];
  public recipeInstructions = [];
	public foodthings = [];      //food items from pantry
  public useInRecipe = [];     //food items that are used to generate recipes, format: {name: "food"}
  public recentlyUsed = [];    //items recently used in recipes, format: {name: "food"}

	constructor(public http: Http) {
    interface food {
        name: string;
        imageURL: string;
        recipeSelected: boolean;
        pantrySelected:  boolean;
      }
      /*
      this.http.get('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/loguser')
      .map(res => res.json()).subscribe(data => {
        this.foodthings=data.message;
        console.log("pantry read!");
        });
        */
      /*
      this.http.get("../testpantry.json").map(res => res.json()).subscribe(data => {
          this.foodthings = data.food;
          console.log(this.foodthings);
        });
*/
      //GET request to populate ingredients in pantry
      /*
      this.http.get('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/fetchPantry')
      .map(res => res.json())
      .subscribe(data => {
          console.log(data.message);
        });
    */
		for(var i in this.foodthings){
			this.foodthings[i]['recipeSelected'] = false;
			this.foodthings[i]['pantrySelected'] = false;
		}
	}

  updateRecentlyUsed(){
    for(var item of this.useInRecipe){
      this.recentlyUsed.push(item);
    }

    while(this.recentlyUsed.length > 25){
      this.recentlyUsed.shift();
    }
  }

	filterItems(searchQuery){
		console.log("food filtering");
		return this.foodthings.filter((food) => {
			return food.name.indexOf(searchQuery.toLowerCase()) > -1;
		});
	}
  
  sortPantry(sort){
    console.log("boop");
    console.log(sort);
    if(sort=="alphabetical"){
      this.foodthings = this.foodthings.sort((n1,n2) => {
          if (n1.name > n2.name) {
              return 1;
          }
          if (n1.name < n2.name) {
              return -1;
          }
          return 0;
      });  
    }
    else if (sort=="category"){
      console.log("catergory ssort not yet!");
    }
    else if (sort=="recent"){
      console.log("recent sort not yet done!");
    }
    else{
      console.log("lol how did you get here")
    }
    for(var i in this.foodthings){
      console.log(this.foodthings[i].name);
		}
    console.log("done sorting!  Enjoy your life!");
  }
  

}
