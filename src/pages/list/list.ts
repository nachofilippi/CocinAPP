import { Component, OnInit } from '@angular/core';

import { ListaRecetasServicios} from '../../app/servicios/lista-recetas';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {


  constructor(private _listaRecetasServicios: ListaRecetasServicios) {}

      ngOnInit(){}

}
