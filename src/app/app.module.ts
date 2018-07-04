import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

// servicios
import { ListaRecetasServicios } from './servicios/lista-recetas';

// pipes
import { PlaceHolderPipe } from './pipes/placeholder.pipe';
import {SafeUrlPipe} from '../pipes/safe-url/safe-url';

// paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IngredientesPage } from '../pages/ingredientes/ingredientes.component';
import { LoginPage }  from '../pages/login/login';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { InfoNutricionalPage } from '../pages/info-nutricional/info-nutricional';
import { FiltrosPage } from '../pages/filtros/filtros';
import { OrdenarPage } from '../pages/ordenar/ordenar';
import { CopiarMailPage } from '../pages/copiar-mail/copiar-mail';

// otras importaciones
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgregarComponent} from '../pages/agregar/agregar.component';
import { DetalleComponent } from '../pages/detalle/detalle.component';
import { HttpClientModule } from  '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { OfflineProvider } from '../providers/rest/offline';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { LoginProvider } from '../providers/login/login';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Clipboard } from '@ionic-native/clipboard';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IngredientesPage,
    AgregarComponent,
    PlaceHolderPipe,
    SafeUrlPipe,
    DetalleComponent,
    LoginPage,
    FavoritosPage,
    InfoNutricionalPage,
    FiltrosPage,
    OrdenarPage,
    CopiarMailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IngredientesPage,
    AgregarComponent,
    DetalleComponent,
    LoginPage,
    FavoritosPage,
    InfoNutricionalPage,
    FiltrosPage,
    OrdenarPage,
    CopiarMailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ListaRecetasServicios,
    RestProvider,
    OfflineProvider,
    Facebook,
    LoginProvider,
    Camera,
    SocialSharing,
    TextToSpeech,
    Clipboard
  ]
})
export class AppModule {}
