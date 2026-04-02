document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const isActive = (pageName) => {
        if (pageName === 'index.html' && (path.endsWith('/') || path.endsWith('index.html'))) {
            return 'style="color: #FF3E3E; font-weight: bold;"'; // Rojo NOTKOMO
        }
        return path.includes(pageName) ? 'style="color: #FF3E3E; font-weight: bold;"' : '';
    };

    const menuHTML = `
        <header>
            <nav class="nav-links">
                <a href="index.html" ${isActive('index.html')}>Inicio</a>
                <a href="#noticias">Noticias</a>
                <a href="#historia">Historia</a>
                <a href="contacto.html">Contacto</a>
            </nav>
            <button class="menu-btn" onclick="toggleMenu()">☰</button>
        </header>

        <div class="sidebar-overlay" onclick="toggleMenu()"></div>
        <div class="sidebar">
            <button class="close-btn" onclick="toggleMenu()">×</button>
            <div class="sidebar-title">NOTKOMO NETWORKS</div>
            <a href="index.html" ${isActive('index.html')}>► Inicio</a>
            <a href="onestudios.html">► ONESTUDIOS (Arte)</a>
            <a href="edc.html">► EDC MEDIOS</a>
            <a href="rigathz.html">► RIGATHZ (Archivo)</a>
            <a href="fundacion.html">► FUNDACIÓN</a>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;">
            <a href="privacidad.html">Aviso de Privacidad</a>
        </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", menuHTML);
});

window.toggleMenu = function() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.sidebar-overlay').classList.toggle('active');
};
