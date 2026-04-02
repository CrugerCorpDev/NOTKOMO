const noticias = [
    {
        titulo: "Evolución de la marca: De EDC a Angel Curiosidades",
        fecha: "02 ABRIL 2026",
        categoria: "COMUNIDAD",
        resumen: "Un repaso por la transición de EDC El Dato Curioso hacia la nueva identidad personal de Angel Curiosidades bajo el sello NOTKOMO.",
        imagen: "logo_notkomo_blue.png", 
        enlace: "angel-curiosidades.html"
    }
    // Aquí irás pegando tus nuevas notas de la red NOTKOMO
];

function inyectarNoticias(idContenedor, cantidad) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    let html = '';
    const listaSeleccionada = noticias.slice(0, cantidad);

    listaSeleccionada.forEach(nota => {
        html += `
        <div class="news-card-home">
            <img src="${nota.image || 'logo_notkomo_blue.png'}" class="card-img-home">
            <div style="padding: 20px; text-align: left;">
                <span style="color: var(--primary-color); font-size: 0.7rem; font-weight: bold; letter-spacing: 1px;">${nota.fecha}</span>
                <h3 style="font-size: 1rem; margin: 10px 0; line-height: 1.4; color: #fff;">${nota.titulo}</h3>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 15px;">${nota.resumen}</p>
                <a href="${nota.enlace}" style="color: var(--primary-color); text-decoration: none; font-size: 0.75rem; font-weight: bold; text-transform: uppercase;">Seguir leyendo →</a>
            </div>
        </div>`;
    });
    contenedor.innerHTML = html;
}
