import { ListaItem } from './lista.item';

export class Lista  {
    nombre: string;
    completado: boolean;
    personas: string;
    items: ListaItem[];


constructor (nombre: string, personas: string){
        this.nombre= nombre;
        this.completado = false;
        this.personas = personas;

    }
}
