import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>()
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
