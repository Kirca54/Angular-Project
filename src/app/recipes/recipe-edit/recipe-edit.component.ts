import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, NgForm, Validator, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup
  constructor(private route: ActivatedRoute,private recipeService: RecipeService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm()
      }
    )
  }

  private initForm(){
    let recipeName = ''
    let recipeDesc = ''
    let recipeImg = ''
    let recipeIngredients = new FormArray([])

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeDesc = recipe.description
      recipeImg = recipe.imgPath
      if(recipe['ingredients']){
        for(let i of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(i.name,Validators.required),
            'amount': new FormControl(i.amount,[Validators.required,Validators.pattern(/^[0-9]+[0-9]*$/)])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'description': new  FormControl(recipeDesc,Validators.required),
        'imgPath': new FormControl(recipeImg,Validators.required),
        'ingredients' : recipeIngredients
    })
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel(){
      this.router.navigate(['../'],{relativeTo: this.route})
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+[0-9]*$/)])
    }))
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
