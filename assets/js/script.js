const asignarEventos = ()=>{

    const pizzas = document.querySelectorAll('input[type="checkbox"][name^="pizza"]');
    pizzas.forEach(tamaño =>{
        tamaño.addEventListener('change', ()=>{
            añadirPizza();
            calcularTotal();
        });
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox =>{
        checkbox.addEventListener('change', () =>{
            actualizarIngredientes();
            calcularTotal();

        });
    });

    let botonPropina = document.getElementById('btnPropina');
    botonPropina.addEventListener('click', agregarPropina);

    let elAvisoPropina = document.getElementById('btnAvisoPropina');
    elAvisoPropina.addEventListener('click', avisoPropina)


}
const preciosPizzas ={
    pizzaS: 5000,
    pizzaM: 8000,
    pizzaL: 12000,
    pizzaXL: 15000
}


const añadirPizza = ()=>{
    // Obtener tamaño
    const pizzasSeleccionadas = document.querySelectorAll('input[type="checkbox"][name^="pizza"]:checked');
    // Contenedor html
    const contenedorPizzas = document.querySelector('.divPizza');
    contenedorPizzas.innerHTML = '';

    if (pizzasSeleccionadas.length === 0){
        contenedorPizzas.innerHTML = '<p>Pizza:</p>';
        return;
    }

        // iteracion en pizzas seleccionadas para crear elementos
    pizzasSeleccionadas.forEach(pizza =>{
        const idPizza = pizza.id;
        const precioPizza = preciosPizzas[idPizza];

        // Obtener el nombre de la pizza (label)
        const label = document.querySelector(`label[for="${idPizza}"]`);
        const nombrePizza = label ? label.textContent : idPizza;

        // contenedores nombre y precio

        const detallePizza = document.createElement('div');
        detallePizza.classList.add('pizza-item');

        const nombre = document.createElement('p');
        nombre.textContent = nombrePizza;

        const precio = document.createElement('p');
        precio.textContent = `$${precioPizza}`;

        // elemento para mostrar cada pizza

        detallePizza.appendChild(nombre);
        detallePizza.appendChild(precio);

        // Se añade el detalle al contenedor
        contenedorPizzas.appendChild(detallePizza);


    })

}

const actualizarIngredientes = ()=>{
    // Obtiene checkbox seleccionado
    const seleccionados = document.querySelectorAll('input[type="checkbox"]:checked:not([name^="pizza"])');

    // Arrays para normales y extras
    let ingredientes = [];
    let extras = [];
    let costoExtra = 0;

    // Iteración para seleccionar y separar
    seleccionados.forEach((checkbox, index) =>{
        // Obtiene el label por su id
        let label = document.querySelector(`label[for="${checkbox.id}"]`);
        if(label){
            
            if (index < 3){
                ingredientes.push(label.textContent); 
            }
            else{
                extras.push(label.textContent); // Igual para los extras, sumando $800 por cada uno
                costoExtra += 800;
            }
        }

    });

    document.getElementById('ingredientesSeleccionados').textContent = ingredientes.length ? ingredientes.join(', ') : 'Ninguno';
    document.getElementById('ingredientesExtras').textContent = extras.length ? extras.join(', ') : 'Ninguno';
    document.getElementById('costoExtra').textContent = `$${costoExtra}`;
}

let propinaTotal = 0;

let agregarPropina = ()=>{
    let propinaDigitada = document.getElementById('propina').value;
    propinaTotal = parseInt(propinaDigitada) > 0 ? parseInt(propinaDigitada) : 1000;


    document.getElementById('costoPropina').textContent = `$${propinaTotal}`;
    alert(`Su propina de $${propinaTotal} ha sido enviada. Muchas gracias.`);
    calcularTotal();
}

let avisoPropina = ()=>{
    // Comprobación de propina
    if (propinaTotal === 0){

        alert('Por favor, ingrese propina.');
    }

    else{
        alert('Gracias por su compra.');
    }

}

const calcularTotal = ()=>{
    let total = 0;

    // Precio pizzas

    const pizzasSeleccionadas = document.querySelectorAll('input[type="checkbox"][name^="pizza"]:checked');
    pizzasSeleccionadas.forEach(pizza =>{
        const idPizza = pizza.id;
        total += preciosPizzas[idPizza];
    });

    // + Precio ing. extras

    const seleccionados = document.querySelectorAll('input[type="checkbox"]:checked:not([name^="pizza"])');
    let costoExtra = 0;
    seleccionados.forEach((checkbox, index) =>{
        if (index >= 3){
            costoExtra += 800;
        }
    });
    total += costoExtra;

    // + Propina

    total += propinaTotal;

    // Muestra total en el div

    document.getElementById('total').textContent = `$${total}`;

}