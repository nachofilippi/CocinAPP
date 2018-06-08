import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginProvider } from '../../providers/login/login';


@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html'
})
export class DetalleComponent implements OnInit {
  receta: any;
  stars: any;
  video: boolean = false;
  ingredientes: boolean = false;
  favorito: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     private toastCtrl: ToastController, private rest: RestProvider, private login: LoginProvider) {
    this.receta = this.navParams.get("receta");

  }

  clickStart(num) {
    this.login.checkLogin().then(
      () => this.pintarEstrellas(num),
      () => this.login.solicitarLogin().then(
        () => this.pintarEstrellas(num),
        () => { }
      )
    );
  }

  pintarEstrellas(num) {
    for (var i = 0; i < this.stars.length; i++) {
      if (i <= num)
        this.stars[i].click = true;
      else
        this.stars[i].click = false;
    }
  }

  borrarLista() {
    let confirm = this.alertCtrl.create({
      title: 'Borrar receta',
      message: 'Esta seguro que usted desea borrar la receta?',
      buttons: [{text:'Cancelar',cssClass:'alert-button'},
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminar');
            this.navCtrl.pop();
          },
          cssClass:'alert-button'
        }
      ]
    });
    confirm.present();
  }

  ngOnInit() {
    this.stars = [];
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
  }

  agregarFavorito() {
      this.login.checkLogin().then(
        ()=>{this.addFav()},
        ()=>{this.login.solicitarLogin().then(()=>this.addFav())}
      );
  }

  addFav() {
    let toast = this.toastCtrl.create({
      message: 'La receta fue añadida a favoritos!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    this.receta.favorito = true;
    this.rest.postFavorito(this.receta).subscribe(data => console.log("Backend"), offline => console.log("Offline"));
  }

  eliminarFavorito() {
    let confirm = this.alertCtrl.create({
      title: 'Quitar favorito',
      message: '¿Estás seguro que querés eliminar la receta de la lista de favoritos?',
      buttons: ['Cancelar',
        {
          text: 'Eliminar',
          handler: () => {
            this.receta.favorito = false;
            this.rest.deleteFavorito(this.receta.id).subscribe(data => console.log ("Backend"), offline => console.log ("Offline"));
          }
        }
      ]
    });
    confirm.present();
  }

}
