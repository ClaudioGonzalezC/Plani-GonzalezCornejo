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


document.addEventListener('DOMContentLoaded', function() {
    const paisSelect = document.getElementById('pais');
    const ciudadSelect = document.getElementById('ciudad');
    let preciosViajes = {};

    // Función para cargar los datos desde el JSON
    function cargarDatos() {
        fetch('./data/destinos.json')
            .then(response => response.json())
            .then(data => {
                preciosViajes = data;
                cargarPaises();
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });
    }

    // Función para cargar las opciones de países
    function cargarPaises() {
        preciosViajes.destinos.forEach(destino => {
            const option = document.createElement('option');
            option.value = destino.pais;
            option.textContent = destino.pais;
            paisSelect.appendChild(option);
        });
    }

    // Función para cargar las ciudades relacionadas al país seleccionado
    function cargarCiudades(paisSeleccionado) {
        ciudadSelect.innerHTML = '<option value="">Selecciona una ciudad</option>';

        if (paisSeleccionado) {
            const paisEncontrado = preciosViajes.destinos.find(destino => destino.pais === paisSeleccionado);
            if (paisEncontrado) {
                paisEncontrado.ciudades.forEach(ciudad => {
                    const option = document.createElement('option');
                    option.value = ciudad.nombre;
                    option.textContent = ciudad.nombre;
                    ciudadSelect.appendChild(option);
                });
            }
        }
    }

    // Función para obtener el precio del viaje
    function obtenerPrecio(pais, ciudad) {
        const paisEncontrado = preciosViajes.destinos.find(destino => destino.pais === pais);
        if (paisEncontrado) {
            const ciudadEncontrada = paisEncontrado.ciudades.find(c => c.nombre === ciudad);
            if (ciudadEncontrada) {
                return ciudadEncontrada.precio;
            }
        }
        return 0;
    }

    // Escuchar cambios en la selección de país
    paisSelect.addEventListener('change', function() {
        const paisSeleccionado = paisSelect.value;
        cargarCiudades(paisSeleccionado);
    });

    // Escuchar cambios en la selección de ciudad
    ciudadSelect.addEventListener('change', function() {
        const pais = paisSelect.value;
        const ciudad = ciudadSelect.value;
        const resultadoCotizacion = document.getElementById('resultadoCotizacion');

        if (ciudad) {
            const precioIdaYVuelta = obtenerPrecio(pais, ciudad) * 2;
            resultadoCotizacion.innerHTML = `
                <p>El precio de ida y vuelta a <strong>${ciudad}, ${pais}</strong> es <strong>${precioIdaYVuelta} CLP</strong>.</p>
            `;
        } else {
            resultadoCotizacion.innerHTML = `
                <p>Selecciona un país y una ciudad para obtener el precio.</p>
            `;
        }
    });

    // Manejar la solicitud de cotización
    document.getElementById('cotizadorForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const pais = paisSelect.value;
        const ciudad = ciudadSelect.value;
        const resultadoCotizacion = document.getElementById('resultadoCotizacion');

        if (ciudad) {
            const precioIdaYVuelta = obtenerPrecio(pais, ciudad) * 2;
            resultadoCotizacion.innerHTML = `
                <p>El precio de ida y vuelta a <strong>${ciudad}, ${pais}</strong> es <strong>${precioIdaYVuelta} CLP</strong>.</p>
            `;
        } else {
            resultadoCotizacion.innerHTML = `
                <p>Selecciona un país y una ciudad para obtener el precio.</p>
            `;
        }
    });

    // Cargar los datos desde el archivo JSON al cargar la página
    cargarDatos();
});