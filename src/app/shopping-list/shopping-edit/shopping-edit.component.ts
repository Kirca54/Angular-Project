import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f',{static:false}) slForm: NgForm

  sub: Subscription
  editMode = false
  editItemId: number
  editetIng: Ingredient

   constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.sub = this.slService.startedEditing.subscribe((id: number) => {
      this.editItemId=id
      this.editMode=true
      this.editetIng=this.slService.getIngredient(id)
      this.slForm.setValue({
        name : this.editetIng.name,
        amount : this.editetIng.amount
      })
    })
  }

  onAdd(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemId,newIngredient)
    }
    else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false
    form.reset()
  }

  onClear(){
    this.slForm.reset()
    this.editMode=false
  }

  onDelete(){
    this.slService.deleteIngredient(this.editItemId)
    this.onClear()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
