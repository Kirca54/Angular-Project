import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

   private recipes:Recipe[]=[
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
   ];
  //private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
