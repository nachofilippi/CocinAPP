import { Component, OnInit } from '@angular/core';
import {IngredientesLista} from '../../app/clases/ingredientesLista';
@Component({
  selector: 'page-ingredientes',
  templateUrl: 'ingredientes.component.html'
})
export class IngredientesPage implements OnInit {

      listas: IngredientesLista[] = [];

  constructor() {


  }

  ngOnInit() { }


}
