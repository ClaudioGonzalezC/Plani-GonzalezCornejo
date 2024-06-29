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