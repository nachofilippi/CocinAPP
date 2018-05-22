import {Categoria} from './Categoria';

export class Ingrediente {
    id: number;
    nombre: string;
    unidad: string;
    categoria: Categoria;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
