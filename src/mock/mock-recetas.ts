export const recetas: any =
    [
        {
            "id": 1,
            "nombre": "Carne",
            "dificultad": 3,
            "personas": 2,
            "tiempo": 50,
            "imagenes": [
                "http://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/07/cortesdecarne.jpg"
            ],
            "video": "https://www.youtube.com/embed/jISlaa0dzeA",
            "ingredientes": [
                {"ingrediente":{"nombre":"Carne", "unidad":"Gramos"},"cantidad":55}
            ],
            "categoria": {
                "id": 1,
                "nombre": "Hola"
            },
            "apto_para": [{id:1, nombre:"Celíacos"}, {id:2, nombre:"Diabetes"}],
            "pasos": [{"nombre":"Paso 1", "descripcion": "¿Le puede ganar Delpo a Nadal?El historial es favorable a Rafa, pero Del Potro tiene razones para ilusionarse de cara a la semi del viernes. Aquí, números y análisis."}, {"nombre":"Paso 2", "descripcion": "Hola"}],
            "puntuaciones":[{puntuacion:1},{puntuacion:3},{puntuacion:5},{puntuacion:5}]
        }
    ];


