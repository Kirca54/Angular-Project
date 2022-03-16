import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{

  selectedRecipe = new EventEmitter<Recipe>();

  recipes:Recipe[]=[
    new Recipe('Hambuger','Classic', 'https://s7d1.scene7.com/is/image/mcdo' +
      'nalds/t-mcdonalds-Hamburger:1-3-product-tile-desktop?wid=829&hei=515&dpr=off',[
        new Ingredient('buns',2),
        new Ingredient('meat',1),
        new Ingredient('ketchup',1),
        new Ingredient('mayonnaise',1),
        new Ingredient('pickle',2)
    ]),
    new Recipe('Cheeseburger','Classic','https://s7d1.scene7.com/is/image/m' +
      'cdonalds/t-mcdonalds-Cheeseburger-1:1-3-product-tile-desktop?wid=829&hei=515&dpr=off ' ,    [
      new Ingredient('buns',2),
      new Ingredient('meat',1),
      new Ingredient('ketchup',1),
      new Ingredient('mayonnaise',1),
      new Ingredient('pickle',2),
      new Ingredient('cheese',1)
    ])
  ]

  constructor(private slService: ShoppingListService) {
  }

  getRecipes(){
    return this.recipes;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
