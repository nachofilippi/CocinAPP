import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SocialSharing } from '@ionic-native/social-sharing';
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
  puedeBorrar: boolean = false;
  favorito: boolean;
  share: any = { facebook: true, whatsapp: true, twitter: true, instagram: true };
  yaPuntuo: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private toastCtrl: ToastController, private rest: RestProvider, public socialSharing: SocialSharing, private login: LoginProvider) {
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
    if (this.yaPuntuo){
      let toast = this.toastCtrl.create({
        message: 'Ya habías calificado a esta receta con ' + this.yaPuntuo + (this.yaPuntuo === 1 ? ' estrella!' : ' estrellas!'),
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      return;
    }
    this.rest.puntuarReceta(this.receta.id, num+1).subscribe(()=>{}, ()=>{});
    for (var i = 0; i < this.stars.length; i++) {
      this.stars[i].pintada = 0;
      if (i <= num)
        this.stars[i].click = true;
      else
        this.stars[i].click = false;
    }
    let toast = this.toastCtrl.create({
      message: 'Gracias por calificar la receta!',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
    this.yaPuntuo = num + 1;
  }

  borrarReceta() {
    let confirm = this.alertCtrl.create({
      title: 'Borrar receta',
      message: 'Esta seguro que usted desea borrar la receta?',
      buttons: [{ text: 'Cancelar', cssClass: 'alert-button' },
      {
        text: 'Eliminar',
        handler: () => {
          this.rest.deleteReceta(this.receta.id).subscribe(
            () => {
              let toast = this.toastCtrl.create({
                message: 'La receta fue eliminada',
                duration: 2500,
                position: 'bottom'
              });
              toast.present();
              this.navCtrl.pop();
            }, () => {
              let toast = this.toastCtrl.create({
                message: 'No se pudo eliminar la receta. Verificá tu conexión a internet',
                duration: 2500,
                position: 'bottom'
              });
              toast.present();
              this.navCtrl.pop();
            }
          );
        },
        cssClass: 'alert-button'
      }]
    });
    confirm.present();
  }

  ngOnInit() {
    this.stars = [];
    this.stars.push({ click: false });
    this.stars.push({ click: false });
    this.stars.push({ click: false });
    this.stars.push({ click: false });
    this.stars.push({ click: false });
    for (let i = 1; i <= 5; i++) {
      if (i <= this.receta.puntuaciones)
        this.stars[i - 1].pintada = 2;
      else if (i - 1 < this.receta.puntuaciones)
        this.stars[i - 1].pintada = 1;
    }

    if (localStorage.getItem("usuario")) {
      let usuario: any = JSON.parse(localStorage.getItem("usuario"));
      if (this.receta.creador && usuario.email === this.receta.creador.mail)
        this.puedeBorrar = true;
    }

    this.rest.getPuntuaciones(this.receta.id).subscribe(
      res => this.yaPuntuo = res[0].puntuacion,()=>{});

    this.socialSharing.canShareVia("com.facebook.android").catch(
      () => this.socialSharing.canShareVia("com.facebook.ios").catch(() => this.share.facebook = false)
    );
    this.socialSharing.canShareVia("com.twitter.android").catch(
      () => this.socialSharing.canShareVia("com.twitter.ios").catch(() => this.share.twitter = false)
    );
    this.socialSharing.canShareVia("com.instagram.android").catch(
      () => this.socialSharing.canShareVia("com.instagram.ios").catch(() => this.share.instagram = false)
    );
    this.socialSharing.canShareVia("com.whatsapp").catch(() => this.share.whatsapp = false)
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

  shareFacebook() {
    this.socialSharing.shareViaFacebook("Miren lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }

  shareTwitter() {
    this.socialSharing.shareViaTwitter("Miren lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }

  shareInstagram() {
    this.socialSharing.shareViaInstagram("Miren lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }

  shareWhatsApp() {
    this.socialSharing.shareViaWhatsApp("Mirá lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }
}
