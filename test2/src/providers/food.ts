import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Food provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Food {

	public foodthings = [];
	
	constructor() {
		//GET REQUEST
		this.foodthings = [{title:"pickle"},{title:"chicken"},{title:"bread"},{title:"eggs"},{title:"cheese"}];
		for(var i in this.foodthings){
			this.foodthings[i]['recipeSelected'] = false;
			this.foodthings[i]['pantrySelected'] = false;
		}
	}

}
