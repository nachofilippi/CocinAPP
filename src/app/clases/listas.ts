import { ListaItem } from './lista.item';

export class Lista  {
    nombre: string;
    completado: boolean;
    personas: string;
    items: ListaItem[];
    show: boolean;
    // pasos
    // dificultad
    // tiempo_preparacion
    // apto_para
    // foto
    // video
    // creador



constructor (nombre: string, personas: string){
        this.nombre= nombre;
        this.completado = false;
        this.personas = personas;
        this.show=false;

    }
}
