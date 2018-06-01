import {Injectable} from '@angular/core';
import {recetas, ingredientes, enfermedades, categorias_recetas, categorias_ingredientes} from '../../mock/mock';

@Injectable()
export class OfflineProvider {

    getIngredientes(): any {
        let ingredientes: any = [];
        if (localStorage.getItem("ingredientes")) {
            ingredientes = JSON.parse(localStorage.getItem("ingredientes"));
        }
        return ingredientes;
    }

    getRecetas(): any {
        let recetas: any = [];
        if (localStorage.getItem("recetas")) {
            recetas = JSON.parse(localStorage.getItem("recetas"));
        }
        return recetas;
    }

    getEnfermedades(): any {
        let enfermedades: any = [];
        if (localStorage.getItem("enfermedades")) {
            enfermedades = JSON.parse(localStorage.getItem("enfermedades"));
        }
        return enfermedades;
    }

    getCategoriasRecetas(): any {
        let categorias: any = [];
        if (localStorage.getItem("categorias_recetas")) {
            categorias = JSON.parse(localStorage.getItem("categorias_recetas"));
        }
        return categorias;
    }

    getCategoriasIngredientes(): any {
        let categorias: any = [];
        if (localStorage.getItem("categorias_ingredientes")) {
            categorias = JSON.parse(localStorage.getItem("categorias_ingredientes"));
        }
        return categorias;
    }

    postReceta(receta: any): any {
        let recetas: any = [];
        if (localStorage.getItem("recetas")) {
            recetas = JSON.parse(localStorage.getItem("recetas"));
        }
        for (let i = 0; i < recetas.ingredientes.length; i++)
            recetas.ingredientes[i] = {nombre: recetas.ingredientes[i].cantidad, cantidad: recetas.ingredientes[i].cantidad};
        recetas.push(receta);
        localStorage.setItem("recetas", JSON.stringify(recetas));
        return receta;
    }
    
    postFavorito(favorito: any): any {
        favorito.favorito = true;
        let favoritos: any = [];
        if (localStorage.getItem("favoritos")) {
            favoritos = JSON.parse(localStorage.getItem("favoritos"));
        }
        favoritos.push(favorito);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        return favorito;
    }
    
    deleteFavorito(idReceta): any {
        let favoritos: any = [];
        if (localStorage.getItem("favoritos")) {
            favoritos = JSON.parse(localStorage.getItem("favoritos"));
        }
        for (let i = 0; i < favoritos.length; i++) {
            if (favoritos[i].id == idReceta)
                favoritos.splice(i, 1);
        }
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
    
    getFavoritos(mail: string): any {
        let favoritos: any = [];
        if (localStorage.getItem("favoritos")) {
            favoritos = JSON.parse(localStorage.getItem("favoritos"));
        }
        return favoritos;
    }

    init() {
        if (!localStorage.getItem("ingredientes")) {
            localStorage.setItem("ingredientes", JSON.stringify(ingredientes));
        }
        if (!localStorage.getItem("recetas")) {
            localStorage.setItem("recetas", JSON.stringify(recetas));
        }
        if (!localStorage.getItem("enfermedades")) {
            localStorage.setItem("enfermedades", JSON.stringify(enfermedades));
        }
        if (!localStorage.getItem("categorias_recetas")) {
            localStorage.setItem("categorias_recetas", JSON.stringify(categorias_recetas));
        }
        if (!localStorage.getItem("categorias_ingredientes")) {
            localStorage.setItem("categorias_ingredientes", JSON.stringify(categorias_ingredientes));
        }
        if (!localStorage.getItem("favoritos")) {
            let favoritos: any = [];
            localStorage.setItem("favoritos", favoritos);
        }
    }
}