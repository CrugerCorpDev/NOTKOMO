document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const isActive = (pageName) => {
        if (pageName === 'index.html' && (path.endsWith('/') || path.endsWith('index.html'))) {
            return 'style="color: #3E8BFF; font-weight: bold;"';
        }
        return path.includes(pageName) ? 'style="color: #3E8BFF; font-weight: bold;"' : '';
    };

    const menuHTML = `
        <header>
            <nav class="nav-links">
                <a href="index.html" ${isActive('index.html')}>Inicio</a>
                <a href="bitacora.html" ${isActive('bitacora.html')}>NOTICIAS</a>
                <a href="angel-cruger.html">Angel Cruger</a>
            </nav>
            <button class="menu-btn" onclick="toggleMenu()">☰</button>
        </header>

        <div class="sidebar-overlay" onclick="toggleMenu()"></div>
        <div class="sidebar">
            <button class="close-btn" onclick="toggleMenu()">×</button>
            <div class="sidebar-title">NOTKOMO NETWORKS</div>
            
            <a href="index.html" ${isActive('index.html')}>► NOTKOMO (Home)</a>
            <a href="angel-curiosidades.html">► Angel Curiosidades</a>
            <a href="onestudios.html">► ONESTUDIOS</a>
            <a href="angel-cruger.html">► Angel Cruger</a>
            <a href="gdm.html">► God, Devil and Me</a>
            <a href="red-rainbow.html">► Red Rainbow</a>
            <a href="fundacion-dws.html">► Fundación DWS</a>
            
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 15px 0;">
            <a href="bitacora.html">Bitácora General</a>
            <a href="privacidad.html" style="font-size: 0.7rem; opacity: 0.6;">Aviso de Privacidad</a>
        </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", menuHTML);
});

window.toggleMenu = function() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if(sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
};
