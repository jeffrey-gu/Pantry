def getRecipeByIngredients(ingredientList, fillIngredients=False, limitLicense=False, numRecipes=10, ranking=1):
	url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?"
	fillIngredientsString = "fillIngredients=" + str(fillIngredients) + "&"
	
	ingredientString = "ingredients="
	for i in range(len(ingredientList)):
		if i == len(ingredientList) - 1:
			ingredientString = ingredientString + ingredientList[i] + "&"
		else:
			ingredientString = ingredientString + ingredientList[i] + "%2C"
	
	limitLicenseString = "limitLicense=" + str(limitLicense) + "&"
	numRecipesString = "number=" + str(numRecipes) + "&"
	rankingString = "ranking=" + str(ranking)
	url = url + fillIngredientsString + ingredientString + limitLicenseString + numRecipesString + rankingString
	print url
	response = unirest.get(url, headers={
		"X-Mashape-Key": "bojeGw3FjNmsh7gaFMMHPo1p3r5Lp1kgmMojsnVKq9kwB6d9az",
    	"Accept": "application/json"
	})
	return response