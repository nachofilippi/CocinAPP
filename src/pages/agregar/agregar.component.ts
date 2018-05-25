import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { ListaRecetasServicios } from '../../app/servicios/lista-recetas';
import {RestProvider} from '../../providers/rest/rest';

@Component({
  selector: 'app-agregar',
  templateUrl: 'agregar.component.html'
})
export class AgregarComponent implements OnInit {

  receta: any;
  categorias:any;
  ingredientes: any;
  ingredientesElegidos: any;
  item: any;
  cantidadItem: number;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public _listaRecetas: ListaRecetasServicios,
    public rest: RestProvider
  ) { }

  ngOnInit() { 
      this.receta={};
      this.receta.ingredientes=[];
      this.receta.pasos=[];
      this.receta.imagenes=["http://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/07/cortesdecarne.jpg"];
      this.ingredientesElegidos=[];
      this.rest.getCategoriasRecetas().subscribe(data => {this.categorias = data}, offline => {this.categorias = offline;});
      this.rest.getIngredientes().subscribe(data => {this.ingredientes = data}, offline => {this.ingredientes = offline;});
    }

  agregar() {
      let item: any;
      item={};
      item=this.ingredientes[this.item];
      item.cantidad = this.cantidadItem;
      this.ingredientesElegidos.push(item);
      this.ingredientes.splice (this.item,1);
  }

  agregarPaso(nombre:string, descripcion:string) {
      this.receta.pasos.push({"nombre": nombre, "descripcion": descripcion});
  }

  borrarPaso(i: number) {
      this.receta.pasos.splice(i, 1);
  }
  
  borrarItem(i: number) {
      this.ingredientes.push(this.ingredientesElegidos[i]);
      this.ingredientesElegidos.splice(i, 1);
  }

  postReceta() {
      this.receta;
      this.ingredientesElegidos.forEach((value)=> {
          this.receta.ingredientes.push ({"ingrediente":value.id,"cantidad":value.cantidad});
      });
      this.rest.postReceta(this.receta).subscribe(data => {console.log (data)}, offline => {console.log(offline)});
      this.navCtrl.pop();
  }
}
