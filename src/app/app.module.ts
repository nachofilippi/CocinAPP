import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// servicios
import { ListaRecetasServicios } from './servicios/lista-recetas';

// pipes
import { PlaceHolderPipe } from './pipes/placeholder.pipe';

// paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IngredientesPage } from '../pages/ingredientes/ingredientes.component';
import { LoginPage }  from '../pages/login/login';


// otras importaciones
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgregarComponent} from '../pages/agregar/agregar.component';
import { DetalleComponent } from '../pages/detalle/detalle.component';
import { HttpClientModule } from  '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IngredientesPage,
    AgregarComponent,
    PlaceHolderPipe,
    DetalleComponent,
    LoginPage
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
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ListaRecetasServicios,
    RestProvider
  ]
})
export class AppModule {}
