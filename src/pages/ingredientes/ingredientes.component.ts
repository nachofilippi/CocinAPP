import { Component, OnInit } from '@angular/core';
import { IngredientesLista } from '../../app/clases/ingredientesLista';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
@Component({
  selector: 'page-ingredientes',
  templateUrl: 'ingredientes.component.html'
})
export class IngredientesPage implements OnInit {

  ingredientes: any = [];
  ingredientesSearch: any = [];
  filtros: any = { input: "" };
  categorias: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private rest: RestProvider) {
    this.ingredientes = this.navParams.get("ingredientes");
    this.ingredientesSearch = this.ingredientes;
  }

  ngOnInit() {
    this.rest.getCategoriasIngredientes().subscribe(data => { this.categorias = data }, offline => { this.categorias = offline; });
  }

  filtrar() {
    setTimeout(() => {
      this.ingredientesSearch = this.ingredientes;
      if (this.filtros.input && this.filtros.input.trim() != '') {
        this.ingredientesSearch = this.ingredientesSearch.filter((ingrediente) => {
          return (ingrediente.nombre.toLowerCase().indexOf(this.filtros.input.toLowerCase()) > -1);
        })
      }
      if (this.filtros.categoria) {
        this.ingredientesSearch = this.ingredientesSearch.filter((ingrediente) => {

          return (ingrediente.categoria.nombre === this.filtros.categoria);
        })
      }
    }, 100);
  }

  seleccionar(i: number) {
    this.ingredientes.forEach(element => {
      if (element.id === this.ingredientesSearch[i].id)
        element.elegido = this.ingredientesSearch[i].elegido;
    });
  }

  dismissData() {
    this.viewCtrl.dismiss(this.ingredientes);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
