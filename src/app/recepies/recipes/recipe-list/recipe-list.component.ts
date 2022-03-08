import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>()
  recipes:Recipe[]=[
    new Recipe('TestRE','Testtest', 'https://static01.nyt.com/images/2013/06/26/' +
      'dining/26JPFLEX1/26JPFLEX1-articleLarge-v3.jpg'),
    new Recipe('TestRE2','Testtest2', 'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg')
  ]

  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
