import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>();
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

  getIngredient(id: number){
    return this.ingredients[id]
  }

  updateIngredient(id:number, newIngredient: Ingredient){
    this.ingredients[id] = newIngredient;
  }

  deleteIngredient(id:number){
    this.ingredients.splice(id,1)
  }
}
