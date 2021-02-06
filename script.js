// Empiezo creando un arreglo de objetos donde almacenare las tareas por hacer.
// La informacion de cada objeto sera: name y status, Finalizada y Eliminar.
//Todos son Strings aunque en un futuro Finalizada y Eliminar se convertiran en botones.
var data = [
    { Tarea: "", Status: "", Finalizada: "", Eliminar: "" }
];


//Funcion que crea la tabla con la informacion que existe en data.
//Como tal esta funcion no dibuja una tabla solo crea los elementos HTML para poder ser dibujada.
function buildTable(data) {
    //Vamos a crear un elemento html "table" y lo almacenaramos en una funcion table.
    var table = document.createElement("table");
    //En la variable fields vamos a almacenar los Keys de data (Tarea, Status, Finalizada, Eliminar).
    var fields = Object.keys(data[0]);
    //Creamos una variable headRow donde le asignaremos un elemento HTML tr
    var headRow = document.createElement("tr");
    //Vamos a recorrer en un ciclo todos los elementos que esten en fields y los almacenaremos en una variable field.
    fields.forEach(function (field) {
        //Vamos a crear una celda TH en la variable headCell
        var headCell = document.createElement("th");
        //A la celda le asisgnaremos un textNode con la informacion que tenga field (Tarea, Status, Finalizada, Eliminar);
        headCell.appendChild(document.createTextNode(field));
        //A headRow le asignaremos un nodo hijo con la informacion de headCell
        headRow.appendChild(headCell);
    });
    //Finalmente a table le asignaremos un nodo hijo que sera headRow y con esto crearemos la primer parte de la tabla.
    //La parte donde vienen los nombres de las variables (Tarea, Status, Finalizada, Eliminar)
    table.appendChild(headRow);

    //Recorreremos cada elemento que hay dentro de data que son objetos en este caso y le pondremos un index
    //para saber en que elemento estamos.
    data.forEach(function (object) {
        //Crearemos una variable row que sea igual a un elemento HTML tr
        var row = document.createElement("tr");
        //En la variable fields vamos a almacenar los Keys de data (Tarea, Status, Finalizada, Eliminar).
        fields.forEach(function (field) {
            //Crearemos una variable cell que sea igual a un elemento HTML td
            var cell = document.createElement("td");
            //Vamos a verificar que si el valor de alguna celda es igual a "En Progreso" entonces reemplazaremos
            //Ese String y lo convertiremos a un boton
            if (object[field] === "En Progreso") {
                //Creamos una variable completeButton que sea igual a un nodoHijo de cell que contenga un elemento
                //HTML de tipo Input
                //Con esto sustituimos en cell el texto que tenia por un Input.
                var completeButton = cell.appendChild(document.createElement("input"));
                //A completeButton le asiganmos los atributos type = submit para el formato como boton y el value
                //= a Completar.
                completeButton.type = "submit", completeButton.value = "Completar";
                //Ponemos el boton dentro de la celda.
                row.appendChild(cell);
                //Le agregamos un eventListener que se active al click del boton y que llame a la funcion updateRegister
                //y le envie el nombre de la tarea que tenga ese boton asignado.
                completeButton.addEventListener("click", function () {
                    updateRegister(object[fields[0]]);
                });
                //Vamos a verificar que si el valor de alguna celda es igual a "Eliminar" entonces reemplazaremos
                //Ese String y lo convertiremos a un boton
            } else if (object[field] === "Eliminar") {
                //Creamos una variable completeButton que sea igual a un nodoHijo de cell que contenga un elemento
                //HTML de tipo Input
                //Con esto sustituimos en cell el texto que tenia por un Input.
                var completeButton = cell.appendChild(document.createElement("input"));
                //A completeButton le asiganmos los atributos type = submit para el formato como boton y el value
                //= a Completar.
                completeButton.type = "submit", completeButton.value = "Eliminar";
                //Ponemos el boton dentro de la celda.
                row.appendChild(cell);
                //Le agregamos un eventListener que se active al click del boton y que llame a la funcion deleteRegister
                //y le envie el nombre de la tarea que tenga ese boton asignado.
                completeButton.addEventListener("click", function () {
                    console.log(object[fields[0]]);
                    deleteRegister(object[fields[0]], "Finalizada");
                });
            } else {
                //Si no se cumple ninguna condicion anterior unicamente insertaremos el texto con la informacion.
                //No se crearan ningun boton.
                cell.appendChild(document.createTextNode(object[field]));
                row.appendChild(cell);
            }
        });
        //Finalmente a tabla le asiganeremos otro nodoHijo que contenga toda la informacion de row.
        table.appendChild(row);
    });
    //Retornamos la tabla creada.
    return table;
}

//En esta funcion  creamos los nuevos registros.
//Se crea un objeto con la informacion que tienen los objetos de data.
//Tarea va a tener el valor que contenga el textArea, el Status lo pondremos como
//Pendiente, Finalizada sera igual a "En Progreso" y Eliminar sera igual a "Eliminar"
//Los elementos Finalizada y Eliminar seran botones en un futuro las Strings asignadas son solo para control.
function newRegister() {
    var newRegister = {
        Tarea: textArea.value,
        Status: "Pendiente",
        Finalizada: "En Progreso",
        Eliminar: "Eliminar",
    };
    //Enviaremos a data un nuevo objeto que es el creado newRegister.
    data.push(newRegister);
    //Llamamos a la funcion para dibujar la tabla.
    drawTable(data);
    //Una vez ingresado el registro, limpiamos el textArea.
    textArea.value = "";
}

//Funcion para Eliminar un valor dentro del arreglo data.
//Recibe un parametro con el nombre name que es el nombre de la tarea que queremos Eliminar. 
function deleteRegister(name) {
    //En la variable fields vamos a almacenar los Keys de data (Tarea, Status, Finalizada, Eliminar).
    var fields = Object.keys(data[0]);
    //Recorreremos cada elemento que hay dentro de data que son objetos en este caso y le pondremos un index
    //para saber en que elemento estamos.
    data.forEach(function (object, index) {
        //Ahora dentro del bucle anterior, recorreremos todas las keys de los objetos e iremos almacenando
        //los valores en una variable llamada field.
        fields.forEach(function (field) {
            //Aplicaremos una condicional en la que si, dentro de los objetos del arreglo en el campo field
            //hay una tarea con el mismo nombre que el buscado entonces lo eliminaremos. 
            //En esta condicional tambien tenemos que considerar otro factor, si nosotros ya finalizamos
            //un registro, entonces el arreglo ya va a tener campos undefined porque, los campos sustituidos
            //por los completados se quedaran sin definir. Por eso hay que poner una segunda condicion en la
            //que unicamente valide los datos que sean distintos a undefined.
            if (object[field] === name && object[field] != undefined) {
                //Usaremos delete que elimina un elemento del arreglo data y le diremos que elimine la informacion
                //que este en la posicion [index].
                delete data[index]
            }
        })
    })
    //Llamamos a la funcion para dibujar la tabla.
    drawTable(data);
}

//Funcion para actualizar un valor dentro del arreglo data.
//Recibe un parametro con el nombre name que es el nombre de la tarea que queremos actualizar. 
function updateRegister(name) {
    //En la variable fields vamos a almacenar los Keys de data (Tarea, Status, Finalizada, Eliminar).
    var fields = Object.keys(data[0]);
    //Recorreremos cada elemento que hay dentro de data que son objetos en este caso y le pondremos un index
    //para saber en que elemento estamos.
    data.forEach(function (object, index) {
        //Ahora dentro del bucle anterior, recorreremos todas las keys de los objetos e iremos almacenando
        //los valores en una variable llamada field.
        fields.forEach(function (field) {
            //Aplicaremos una condicional en la que si, dentro de los objetos del arreglo en el campo field
            //hay una tarea con el mismo nombre que el buscado entonces lo sustituiremos.
            if (object[field] === name) {
                //Vamos a crear una varibale newTodos en la que almacenaremos data.
                var newTodos = [...this.data];
                //Luego en el nuevo arreglo newTodos en su campo Index recordando que Index viene de la primera iteracion
                //y nos indica en que elemento del arreglo estamos, lo vamos a igualar a el mismo pero reemplazando el valor
                //de Status por Finalizada.
                newTodos[index] = { ...newTodos[index], Tarea: name, Status: "Finalizada" }
                //Luego de hacer la copia simplemente a data le vamos a asignar el arreglo sustituido.
                data = newTodos;
            }
        })
    })
    //Llamamos a la funcion para dibujar la tabla.
    drawTable(data);
}

//Funcion que dibuja las tablas.
function drawTable(data) {
    //Le ponemos un hijo a app que dibuje una tabla con la informacion de data.
    app.appendChild(buildTable(data));
    //Condicional que sirve para eliminar la tabla original y reemplazarla por la nueva.
    //Hasta este momento app tiene 4 hijos, el text area, el boton, la tabla original y la nueva tabla.
    //Con esta condicional eliminamos el hijo[2] que es la tabla original de otra manera, se seguirian
    //viendo las tablas originales por encima.
    if (app.childNodes.length > 0) {
        app.removeChild(app.childNodes[2]);
    }
}

//Funcion para crear el input para poner el nombre de la tarea
function toDoText() {
    var textArea = document.createElement("input");
    textArea.placeholder = "Tarea";
    return textArea;
}

//Funcion para crear el boton para ingresar la nueva tarea
function toDoButton() {
    var submitButton = document.createElement("input");
    submitButton.type = "submit", submitButton.value = "Subir Tarea";
    return submitButton;
}

//Creamos un nodo llamado app que es el div que tenemos en el HTML.
var app = document.getElementById("app");
//Creamos un hijo al nodo app para dibujar el textArea para ingresar una tarea.
var textArea = app.appendChild(toDoText());
//Creamos un hijo al nodo app para dibujar un boton para ingresar una tarea.
var toDoButton = app.appendChild(toDoButton());


//Registro de tareas;
toDoButton.addEventListener("click", () => {
    if (textArea.value === "") {
        alert("Debes ingresar nombre de la tarea")
    } else {
        newRegister();
    }
});


//Cuando abre la pagina dibuja la tabla.
window.onload = function () {
    app.appendChild(buildTable(data))
}

