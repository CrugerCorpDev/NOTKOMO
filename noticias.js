async function inyectarNoticias(contenedorId, limite = null) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    try {
        // Lee el archivo maestro que genera tu panel
        const respuesta = await fetch('noticias.json');
        if (!respuesta.ok) throw new Error("No hay noticias");
        const data = await respuesta.json();
        
        let articulos = data.articulos || [];
        
        // Ordena para que la más nueva salga primero
        articulos.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (limite) articulos = articulos.slice(0, limite);

        contenedor.innerHTML = articulos.map(art => `
            <div style="background: var(--bg-alt); border: 1px solid rgba(62, 139, 255, 0.2); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 180, 216, 0.05); display: flex; flex-direction: column; transition: transform 0.3s;">
                ${art.image ? `<img src="${art.image}" alt="${art.title}" style="width: 100%; height: 200px; object-fit: cover;">` : '<div style="height: 200px; background: linear-gradient(135deg, #1a2a40, #3E8BFF); display: flex; align-items: center; justify-content: center; color: white; font-family: monospace;">NOTKOMO DATABANK</div>'}
                <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                    <h3 style="margin-top: 0; color: var(--primary-color); font-size: 1.3rem; font-weight: 800;">${art.title}</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 15px; font-family: monospace;">
                        ${new Date(art.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <div style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 25px; flex-grow: 1; line-height: 1.6;">
                        ${art.body.replace(/[#_*`>\[\]]/g, '').substring(0, 140)}...
                    </div>
                    <a href="bitacora.html" style="display: block; background: linear-gradient(135deg, #3E8BFF, #00B4D8); color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; text-align: center; font-size: 0.85rem; letter-spacing: 1px;">LEER COMPLETA</a>
                </div>
            </div>
        `).join('');

    } catch (error) {
        contenedor.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-family: monospace;">[ DATABANK VACÍO - ESPERANDO TRANSMISIÓN ]</p>';
    }
}
