import { Injectable } from '@angular/core';
import { Lista } from '../clases/listas';

@Injectable()
export class ListaRecetasServicios {

    listas: Lista  [] = [];

  constructor() {

      let  lista1 = new Lista ('Milanesa a la napolitana');
      let  lista2 = new Lista ('Milanesa a la napolitana con fritas');
      let  lista3= new Lista ('Milanesa a la suiza');
      let  lista4 = new Lista ('Spaghetti a la carbonara');
      let  lista5 = new Lista ('Ravioles a la carbonara');

      this.listas.push(lista1);
      this.listas.push(lista2);
      this.listas.push(lista3);
      this.listas.push(lista4);
      this.listas.push(lista5);


      console.log("Servicio listo.");
    }

}
