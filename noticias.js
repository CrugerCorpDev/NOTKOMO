const noticias = [
    {
        titulo: "Postura Oficial: Software Dark Zone",
        fecha: "28 MARZO 2026",
        categoria: "COMUNICADO OFICIAL",
        resumen: "Cruger Corp aclara las capacidades de cifrado, descifrado y triturado, así como el protocolo TITANIUM/PHANTOM.",
        imagen: "logo_notkomo_blue.png", // Luego la cambias por la real
        enlace: "postura-darkzone.html"
    },
    {
        titulo: "Declaración sobre hackeo al director del FBI",
        fecha: "27 MARZO 2026",
        categoria: "SEGURIDAD",
        resumen: "Análisis sobre la filtración del correo de Kash Patel y la urgencia de reducir brechas de ciberseguridad.",
        imagen: "fbi-news.jpg",
        enlace: "declaracion-fbi.html"
    },
    {
        titulo: "Soberanía Tecnológica y Vulnerabilidad",
        fecha: "23 MARZO 2026",
        categoria: "MANIFIESTO",
        resumen: "Manifiesto crucial sobre la situación de la ciberseguridad nacional y nuestra postura operativa oficial.",
        imagen: "soberania.jpg",
        enlace: "manifiesto-soberania.html"
    }
];

// Función para cargar las últimas N noticias en cualquier contenedor
function inyectarNoticias(idContenedor, cantidad) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    let html = '';
    // Tomamos solo las más recientes según la cantidad pedida
    const listaSeleccionada = noticias.slice(0, cantidad);

    listaSeleccionada.forEach(nota => {
        html += `
        <div class="news-card-home">
            <img src="${nota.imagen}" class="card-img-home">
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
