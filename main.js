function Seguro(marca, anio, tipo) {
    this.marca = marca; 
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = () => {
    // 1 = americano 1.15
    // 2 = asiatico 1.05
    // 3 = europeo 1.35
 
    let cantidad;
    const base = 2000;

    switch(this.marca){
         case '1':
              cantidad = base * 1.15;
              break;
         case '2':
              cantidad = base * 1.05;
              break;
         case '3':
              cantidad = base * 1.35;
              break;
    }
    
     // Leer el año
     const diferencia = new Date().getFullYear() - this.anio;
     // Cada año de diferencia hay que reducir 3% el valor del seguro
     cantidad -= ((diferencia * 3) * cantidad) / 100;
     /*
          Si el seguro es básico se múltiplica por 30% mas
          Si el seguro es completo 50% mas
     */
    if(this.tipo === 'basico') {
         cantidad *= 1.30;
    } else {
         cantidad *= 1.50;
    }

     return cantidad;
}

//Todo lo que se muestra
function Interfaz() {}

Interfaz.prototype.mostrarError = (mensaje, tipo) => {
    const div = document.createElement('div');

    if(tipo == 'error') {
        div.classList.add('mensaje','error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout( () => {
            document.querySelector('.mensaje').remove();
    }, 3000);
}
//Mostrar Resultado
Interfaz.prototype.mostrarResultado = (seguro, total) => {
    const resultado = document.getElementById('resultado');
    let marca;
    switch(seguro.marca) {
        case '1':
             marca = 'Americano';
             break;
        case '2':
             marca = 'Asiatico';
             break;
        case '3':
             marca = 'Europeo';
             break;
   }
   // Crear un div
   const div = document.createElement('div');
   // Insertar la informacion
   div.innerHTML = `
        <p class='header'>Tu Resumen: </p>
        <p>Marca: ${marca} </p>
        <p>Año: ${seguro.anio} </p>
        <p>Tipo: ${seguro.tipo} </p>
        <p> Total: $ ${total} </p>
   `;

   resultado.appendChild(div);

}
//Event Listeneres
const formulario = document.getElementById('btnSend');

formulario.addEventListener('click', e => { //deberia ser submit
    e.preventDefault();
    //leer
    const marca = document.getElementById('formGroupBrandInputSelect');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //anio
    const anio = document.getElementById('formGroupYearInputSelect');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //radio
    const tipo = document.querySelector('input[name="formGroupTypeInput"]:checked');

    const interfaz = new Interfaz();

    if(marcaSeleccionada =='' || anioSeleccionado == '' || tipo == '') {
        // console.log('faltandatos');
        interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error');
    } else {
        // console.log('ok');        
        const resultados = document.querySelector('#resultado div');
        if(resultados != null) {
            resultados.remove();
        }

        // Instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        // Cotizar el seguro
        const cantidad = seguro.cotizarSeguro();
        // Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...', 'exito');
    }

});

const max = new Date().getFullYear(),
      min = max - 20;

const selectAnios = document.getElementById('formGroupYearInputSelect');

for(let i=max; i > min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}