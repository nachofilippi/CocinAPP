import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ListaRecetasServicios } from '../../app/servicios/lista-recetas';
import {RestProvider} from '../../providers/rest/rest';

@Component({
  selector: 'app-agregar',
  templateUrl: 'agregar.component.html'
})
export class AgregarComponent implements OnInit {

    receta: any;
    categorias: any;
    ingredientes: any;
    ingredientesElegidos: any;
  item: any;
  cantidadItem: number;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public _listaRecetas: ListaRecetasServicios,
    public rest: RestProvider,
    private camera: Camera
  ) { }

  ngOnInit() { 
      this.receta={};
      this.receta.ingredientes=[];
      this.receta.pasos=[];
      this.receta.imagenes=[];
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
  
  borrarImagen(i: number) {
      this.receta.imagenes.splice(i, 1);
  }
  
  borrarItem(i: number) {
      this.ingredientes.push(this.ingredientesElegidos[i]);
      this.ingredientesElegidos.splice(i, 1);
  }

  postReceta() {
      this.ingredientesElegidos.forEach((value)=> {
          this.receta.ingredientes.push ({"ingrediente":value.id,"cantidad":value.cantidad});
      });
      this.rest.postReceta(this.receta).subscribe(data => {console.log (data)}, offline => {console.log(offline)});
      this.navCtrl.pop();
  }
  
  takePhoto(sourceType: number = 0) {
      //0 para galería - 1 para Cámara
      const options: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType: sourceType,
      }

      this.camera.getPicture(options).then((imageData) => {
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          this.receta.imagenes.push(base64Image);
      }, (err) => {
          // Handle error
      });
  }
}
