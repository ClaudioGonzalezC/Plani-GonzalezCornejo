// Función para solicitar el nombre y mostrarlo
function solicitarNombre() {
    // Obtener el nombre del almacenamiento local
    let nombre = localStorage.getItem('nombre');
    
    // Si no hay nombre en el almacenamiento local, solicitarlo al usuario
    if (!nombre) {
        nombre = prompt('Por favor, introduce tu nombre:');
        
        // Guardar el nombre en el almacenamiento local
        localStorage.setItem('nombre', nombre);
    }
    
    // Mostrar el nombre en todos los elementos con la clase 'nombreUsuario'
    const elementosNombreUsuario = document.querySelectorAll('.nombreUsuario');
    elementosNombreUsuario.forEach(elemento => {
        elemento.textContent = `${nombre}`;
    });
}

// Llamar a la función para solicitar y mostrar el nombre
solicitarNombre();


document.addEventListener('DOMContentLoaded', () => {
    const paisInput = document.getElementById('pais');
    const ciudadInput = document.getElementById('ciudad');
    const resultadoDiv = document.getElementById('resultado');

    // Cargar datos desde el JSON
    fetch('./storage/data.json')
        .then(response => response.json())
        .then(data => {
            const destinos = data.destinos;

            paisInput.addEventListener('input', () => {
                const paisSeleccionado = paisInput.value;
                const paisEncontrado = destinos.find(d => d.pais.toLowerCase() === paisSeleccionado.toLowerCase());

                ciudadInput.innerHTML = '';

                if (paisEncontrado) {
                    paisEncontrado.ciudades.forEach(ciudad => {
                        const option = document.createElement('option');
                        option.value = ciudad.nombre;
                        option.textContent = ciudad.nombre;
                        ciudadInput.appendChild(option);
                    });

                    ciudadInput.disabled = false;
                } else {
                    ciudadInput.disabled = true;
                }

                mostrarPrecio();
            });

            ciudadInput.addEventListener('input', mostrarPrecio);

            function mostrarPrecio() {
                const paisSeleccionado = paisInput.value;
                const ciudadSeleccionada = ciudadInput.value;
                const paisEncontrado = destinos.find(d => d.pais.toLowerCase() === paisSeleccionado.toLowerCase());

                if (paisEncontrado) {
                    const ciudadEncontrada = paisEncontrado.ciudades.find(c => c.nombre.toLowerCase() === ciudadSeleccionada.toLowerCase());

                    if (ciudadEncontrada) {
                        resultadoDiv.textContent = `El precio del viaje a ${ciudadSeleccionada}, ${paisSeleccionado} es $${ciudadEncontrada.precio}`;
                    } else {
                        resultadoDiv.textContent = `No tenemos información sobre la ciudad ${ciudadSeleccionada}`;
                    }
                } else {
                    resultadoDiv.textContent = `No tenemos información sobre el país ${paisSeleccionado}`;
                }
            }
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});