import {Injectable} from '@angular/core';
import {Facebook} from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {RestProvider} from '../rest/rest'


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

    usuario: any = {};


    constructor(public fb: Facebook, public alertCtrl: AlertController, public toastCtrl: ToastController, public rest: RestProvider) {
    }

    checkLogin() {
        var promise = new Promise((resolve, reject) => {

            this.fb.getLoginStatus()
                .then(res => {
                    if (res.status === "connected") {
                        resolve(JSON.parse(localStorage.getItem("usuario")));
                    } else
                        reject();
                })
                .catch(e => {this.sinConexion(); console.log(e); reject();});

        });
        return promise;
    }
    
    solicitarLogin() {
        var promise = new Promise((resolve, reject) => {

            let alert = this.alertCtrl.create({
                title: 'Inicie sesión',
                message: 'Para acceder a esta función deberá loguearse previamente',
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: () => {
                            reject(false);
                        }
                    },
                    {
                        text: 'Iniciar sesión',
                        handler: () => {
                            this.loginFacebook().then((usuario) => resolve(usuario), () => reject(false));
                        }
                    }
                ]
            });
            alert.present();
        });
        return promise;
    }

    loginFacebook() {

        var promise = new Promise((resolve, reject) => {
            this.fb.login(['public_profile', 'user_friends', 'email'])
                .then(res => {
                    if (res.status === "connected") {
                        this.usuario.foto = "https://graph.facebook.com/" + res.authResponse.userID + "/picture?width=720&height=720";
                        this.fb.api("/" + res.authResponse.userID + "/?fields=id,email,name,picture,gender", ["public_profile"])
                            .then(res => {
                                this.usuario.nombre = res.name;
                                this.usuario.email = res.email;
                                localStorage.setItem("usuario", JSON.stringify(this.usuario));
                                this.rest.postUsuario({nombre:res.name,mail:res.email,imagen:this.usuario.foto}).subscribe(function (data) { return console.log("Backend"); }, function (offline) { return console.log("Offline"); });
                                resolve(this.usuario);
                            })
                            .catch(e => {
                                this.sinConexion();
                                console.log(e);
                            });
                    } else {
                        reject();
                    }
                    console.log(res);
                })
                .catch(e => {console.log(e); if (e.errorCode != 4201) this.sinConexion(); reject()});
        });
        return promise;
    }

    logout() {
        var promise = new Promise((resolve, reject) => {

            this.fb.logout().then(() => {
                localStorage.setItem("usuario", JSON.stringify({}));
                resolve();
            });
        });

        return promise;
    }
    
    sinConexion() {
        let toast = this.toastCtrl.create({
            message: 'Sin conexión a internet',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
}
