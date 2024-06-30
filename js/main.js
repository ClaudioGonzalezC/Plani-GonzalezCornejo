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




// Función para obtener los datos del JSON
async function obtenerPreciosViajes() {
    try {
        const response = await fetch('./storage/data.json'); // Ajusta la ruta según la ubicación de tu archivo JSON
        if (!response.ok) {
            throw new Error('Error al obtener los datos del archivo JSON');
        }
        const preciosViajes = await response.json();
        console.log('Datos del JSON obtenidos:', preciosViajes); // Log para verificar los datos
        return preciosViajes;
    } catch (error) {
        console.error(error);
        return {};
    }
}

// Manejar la solicitud de cotización
document.getElementById('cotizadorForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const destino = document.getElementById('destino').value.trim();
    const resultadoCotizacion = document.getElementById('resultadoCotizacion');
    
    console.log('Destino ingresado:', destino); // Log para verificar el destino ingresado
    
    const preciosViajes = await obtenerPreciosViajes();
    
    if (preciosViajes[destino]) {
        const precioIdaYVuelta = preciosViajes[destino] * 2;
        resultadoCotizacion.innerHTML = `
            <p>El precio de ida y vuelta a <strong>${destino}</strong> es <strong>${precioIdaYVuelta} CLP</strong>.</p>
        `;
    } else {
        resultadoCotizacion.innerHTML = `
            <p>No tenemos información sobre el destino <strong>${destino}</strong>.</p>
        `;
    }
});
