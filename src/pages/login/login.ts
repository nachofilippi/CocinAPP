import {Component, OnInit} from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import {GooglePlus} from '@ionic-native/google-plus';


@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

    titulo: string = "Iniciar sesión";
    logueado: boolean = false;
    nombre: string="";
    apellido: string="";
    email: string="";
    foto: string="";

    constructor(private fb: Facebook, private googlePlus: GooglePlus) {
        fb.getLoginStatus()
            .then(res => {
                console.log(res);
                if (res.status === "connect")
                    this.logueado = true;

            })
            .catch(e => console.log(e));
    }

    ngOnInit() {
    }

    loginFacebook() {
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(res => {
                if (res.status === "connected") {
                    this.logueado = true;
                    this.fb.api("/" + res.authResponse.userID + "/?fields=id,email,name,picture,gender", ["public_profile"])
                        .then(res => {
                            this.nombre = res.name;
                            this.email = res.email;
                            this.foto = res.picture.data.url;
                        })
                        .catch(e => {
                            console.log(e);
                        });
                } else {
                    this.logueado = false;
                }
                console.log(res);
            })
            .catch(e => console.log(e));
    }

    loginGoogle() {
        this.googlePlus.login({})
            .then(res => {
                console.log(res);
                this.nombre = res.givenName;
                this.email = res.email;
                this.apellido = res.familyName;
                //                this.userId = res.userId;
                this.foto = res.imageUrl;
                this.logueado = true;
            })
            .catch(err => alert(JSON.stringify(err)));
    }

    logout() {
        this.fb.logout()
            .then(res => this.logueado = false)
            .catch(e => console.log('Error logout from Facebook', e));
    }

}
