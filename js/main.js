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





// Datos de ejemplo
const viajes = [
    { lugar: 'Villarrica, Chile', year: 2024, images: [1, 2, 3, 4] },
    { lugar: 'Freire, Chile', year: 2023, images: [1, 2, 3, 4] },
    { lugar: 'Londres, Inglaterra', year: 2023, images: [1, 2, 3, 4] },
    { lugar: 'Paris, Francia', year: 2023, images: [1, 2, 3, 4] }
];

// Operador Ternario / AND / OR
const getYearStatus = year => year === 2024 ? 'Nuevo' : 'Antiguo';
const getPlaceStatus = place => place === 'Villarrica, Chile' ? 'Popular' : 'Común';

// Desestructuración
const { lugar: firstPlace, year: firstYear, images: firstImages } = viajes[0];

// Spread
const nuevoViaje = { ...viajes[0], year: 2025 };

// Codificación de Funciones
function mostrarViajes(viajes) {
    const contenedor = document.querySelector('.timeline__contenedor');
    contenedor.innerHTML = '';
    viajes.forEach(({ lugar, year, images }) => {
        const galeriaHtml = `
            <div class="timeline__galeria">
                <div class="timeline__galeria__titulo">
                    <p class="galeria__titulo">${lugar}</p>
                    <p class="galeria__fecha">${year}</p>
                </div>
                <div class="timeline__galeria__lateral">
                    ${images.map((img, idx) => `
                        <div class="timeline__imagen">
                            <a href="#">
                                ${idx === 2 ? `<span>+${images.length - 3}</span>` : ''}
                                <img src="https://claudiogonzalezc.github.io/Plani-GonzalezCornejo/assets/images/timeline-${lugar.split(',')[0].toLowerCase()}-${img}.webp" alt="${lugar}">
                            </a>
                        </div>
                    `).join('')}
                </div>
                <a href="#">
                    <img src="https://claudiogonzalezc.github.io/Plani-GonzalezCornejo/assets/images/timeline-${lugar.split(',')[0].toLowerCase()}-${images[0]}.webp" alt="${lugar}">
                </a>
            </div>
        `;
        contenedor.insertAdjacentHTML('beforeend', galeriaHtml);
    });
}

// Evento y Lógica
document.querySelector('.timeline__titulos a').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarViajes(viajes);
});

// Inicialización
mostrarViajes(viajes);