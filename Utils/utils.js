var unirest = require('unirest');

/**
Get the set of recipes that fits a given input of ingredients. Information is returned in 
the callback function end, any manipulation of the data should be done there.

@param ingredientList: List of ingredients to use in search for recipes
@param fillIngredients: Get extra information about the ingredients (default false)
@param limitLicense: Limit the recipes to those that have liscence (default false)
@param numRecipes: Number of recipes returned by the funtion (default 10)
@param ranking: If 1 rank by number of ingredeints used, if 2 rank by number of ingredients missing (default 1)
*/
function getRecipeByIngredients(ingredientList, fillIngredients=false, limitLicense=false, numRecipes=10, ranking=1) {
        var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?"

        var fillIngredientsString = "fillIngredients=" + fillIngredients.toString() + "&"

        var ingredientString = "ingredients="
        for(var i = 0; i < ingredientList.length; i++) {
                if(i == ingredientList.length - 1) {
                        console.log(ingredientList[i]);
                        ingredientString = ingredientString + ingredientList[i] + "&";
                        console.log(ingredientString)
                } else {
                        console.log(ingredientList[i]);
                        ingredientString = ingredientString + ingredientList[i] + "%2C";
                        console.log(ingredientString);
                }
        }

        var limitLicenseString = "limitLicense=" + limitLicense.toString() + "&"
        var numRecipesString = "number=" + numRecipes.toString() + "&"
        var rankingString = "ranking=" + ranking
        url = url + fillIngredientsString + ingredientString + limitLicenseString + numRecipesString + rankingString
        var response = unirest.get(url)
                .header("X-Mashape-Key", "bojeGw3FjNmsh7gaFMMHPo1p3r5Lp1kgmMojsnVKq9kwB6d9az")
                .header("Accept", "application/json")
                .end(function(response) {
                		//Do whatever you need to do with the information in here
                        console.log(response);
                });
}


/**
Get the specific ingredients for a recipe given a recipe ID (this value should be saved). Information
is returned in the callback function as response, any manipulation to data should be done there

@param recipeId: Numeric id of a specific recipe
@param includeNutrition: include nutritional information in ingredient data (default false)
*/
function getIngredients(recipeId, includeNutrition=false) {
	url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"; 
	url = url + recipeId;
	url = url + "/information?includeNutrition=" + includeNutrition.toString();
	var response = unirest.get(url)
		.header("X-Mashape-Key", "bojeGw3FjNmsh7gaFMMHPo1p3r5Lp1kgmMojsnVKq9kwB6d9az")
		.header("Accept", "application/json")
        .end(function(response) {
        	//Do whatever you need to do with the information in here
            console.log(response);
    });

}