import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map, catchError} from 'rxjs/operators';
import 'rxjs/Rx';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

    baseUrl: string = "http://localhost/CocinApi/web/app_dev.php/api";

    constructor(public http: HttpClient) {
    }

    getIngredientes(): Observable<{}> {
        return this.http.get(this.baseUrl + '/ingrediente').pipe(
            map(this.extractData),
            catchError(function () {
//                let ingrediente = new Ingrediente;
//                ingrediente.nombre = "asdad";
//                return Observable.throw(ingrediente);
                return Observable.throw("hola");
            }
            )
        );
    }

    getRecetas(): Observable<{}> {
        return this.http.get(this.baseUrl + '/receta').pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    getEnfermedades(): Observable<{}> {
        return this.http.get(this.baseUrl + '/enfermedad').pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    getCategoriasRecetas(): Observable<{}> {
        return this.http.get(this.baseUrl + '/receta/categoria').pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    getCategoriasIngredientes(): Observable<{}> {
        return this.http.get(this.baseUrl + '/ingrediente/categoria').pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    postReceta(receta: any): Observable<{}> {
        return this.http.post(this.baseUrl + '/receta', receta).pipe(map(this.extractData), catchError(this.handleError));
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const err = error || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
}


