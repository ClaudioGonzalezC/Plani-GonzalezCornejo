function solicitarNombre() {
    let nombre = localStorage.getItem('nombre');
    if (!nombre) {
        nombre = prompt('Por favor, introduce tu nombre:');
        localStorage.setItem('nombre', nombre);
    }
    const elementosNombreUsuario = document.querySelectorAll('.nombreUsuario');
    elementosNombreUsuario.forEach(elemento => {
        elemento.textContent = `${nombre}`;
    });
}

solicitarNombre();


document.addEventListener('DOMContentLoaded', () => {
    const paisInput = document.getElementById('pais');
    const ciudadInput = document.getElementById('ciudad');
    const seguroInput = document.getElementById('seguro');
    const resultadoDiv = document.getElementById('resultado');

    const valorSeguro = 50000;

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
            seguroInput.addEventListener('change', mostrarPrecio);

            function mostrarPrecio() {
                const paisSeleccionado = paisInput.value;
                const ciudadSeleccionada = ciudadInput.value;
                const paisEncontrado = destinos.find(d => d.pais.toLowerCase() === paisSeleccionado.toLowerCase());

                if (paisEncontrado) {
                    const ciudadEncontrada = paisEncontrado.ciudades.find(c => c.nombre.toLowerCase() === ciudadSeleccionada.toLowerCase());

                    if (ciudadEncontrada) {
                        const precioViaje = ciudadEncontrada.precio;
                        const precioTotal = seguroInput.checked ? precioViaje + valorSeguro : precioViaje;
                        resultadoDiv.textContent = `El precio del viaje a ${ciudadSeleccionada}, ${paisSeleccionado} es $${precioTotal.toLocaleString()} (${seguroInput.checked ? 'con' : 'sin'} seguro)`;
                    } else {
                        resultadoDiv.textContent = `No existe información sobre la ciudad ${ciudadSeleccionada}`;
                    }
                } else {
                    resultadoDiv.textContent = `No existe información sobre el país ${paisSeleccionado}`;
                }
            }
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});