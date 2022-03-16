import {Ingredient} from "../shared/ingredient.model";

export class ShoppingListService{
  ingredients: Ingredient[]=[
    new Ingredient('Apples',5),
    new Ingredient('Pear',6)
  ]
  getIngredients(){
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);

  }

}
