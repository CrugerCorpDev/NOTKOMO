const noticias = [
    {
        titulo: "Portal Oficial de NOTKOMO NETWORKS en vivo",
        fecha: "02 ABRIL 2026",
        categoria: "NOTKOMO",
        resumen: "Inicia la fase de unificación de la red creativa de Angel Cruger. El Hub central ya está operativo bajo el dominio notkomo.space.",
        imagen: "logo_notkomo_blue.png", 
        enlace: "index.html"
    },
    {
        titulo: "Archivo Angel Curiosidades disponible",
        fecha: "02 ABRIL 2026",
        categoria: "ANGEL CURIOSIDADES",
        resumen: "Se integra formalmente el historial de EDC El Dato Curioso a la red soberana de NOTKOMO.",
        imagen: "logo_notkomo_blue.png",
        enlace: "angel-curiosidades.html"
    }
];

function inyectarNoticias(idContenedor, cantidad) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;
    let html = '';
    const listaSeleccionada = noticias.slice(0, cantidad);
    listaSeleccionada.forEach(nota => {
        html += `
        <div class="news-card-home">
            <img src="${nota.imagen}" class="card-img-home" onerror="this.src='https://via.placeholder.com/400x200?text=NOTKOMO+IMAGE'">
            <div style="padding: 20px; text-align: left;">
                <span style="color: var(--primary-color); font-size: 0.7rem; font-weight: bold;">${nota.fecha}</span>
                <h3 style="font-size: 1rem; margin: 10px 0; color: #fff;">${nota.titulo}</h3>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 15px;">${nota.resumen}</p>
                <a href="${nota.enlace}" style="color: var(--primary-color); text-decoration: none; font-size: 0.75rem; font-weight: bold;">Seguir leyendo →</a>
            </div>
        </div>`;
    });
    contenedor.innerHTML = html;
}
