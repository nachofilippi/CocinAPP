import {Injectable} from '@angular/core';
import {Facebook} from '@ionic-native/facebook';


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

    usuario: any = {};


    constructor(public fb: Facebook) {
    }

    checkLogin() {
        var promise = new Promise((resolve, reject) => {

            this.fb.getLoginStatus()
                .then(res => {
                    console.log(res);
                    if (res.status === "connected") {
                        resolve(JSON.parse(localStorage.getItem("usuario")));
                    } else
                        reject(false);
                })
                .catch(e => {console.log(e); reject(false);});

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
                                resolve(this.usuario);
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    } else {
                        reject();
                    }
                    console.log(res);
                })
                .catch(e => {console.log(e); reject()});
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

}
