import {Categoria} from './Categoria';
import {ItemIngrediente} from './ItemIngrediente';
import {InfoNutricional} from './InfoNutricional';
import {Paso} from './Paso';
import {Enfermedad} from './Enfermedad';

export class Receta {
    id: number;
    nombre: string;
    descripcion: string;
    dificultad: number;
    tiempo: number;
    ingredientes: Array<ItemIngrediente>;
    pasos: Array<Paso>;
    apto_para: Array<Enfermedad>;
    imagenes: Array<string>;
    video: string;
    categoria: number;
    info_nutricional: InfoNutricional;
}

