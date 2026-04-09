async function inyectarNoticias(contenedorId, limite = null) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    const repo = "CrugerCorpDev/NOTKOMO";

    // Función auxiliar para extraer datos del encabezado de los archivos Markdown (.md)
    function parsearNota(textoMarkdown) {
        const match = textoMarkdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (!match) return { datos: {}, cuerpo: textoMarkdown };
        
        const datos = {};
        match[1].split('\n').forEach(linea => {
            const index = linea.indexOf(':');
            if (index > -1) {
                let llave = linea.slice(0, index).trim();
                let valor = linea.slice(index + 1).trim();
                if(valor.startsWith('"') && valor.endsWith('"')) valor = valor.slice(1, -1);
                datos[llave] = valor;
            }
        });
        return { datos, cuerpo: match[2] };
    }

    try {
        // 1. Obtener la lista de archivos directamente de la carpeta "noticias" en GitHub
        const urlApi = `https://api.github.com/repos/${repo}/contents/noticias?t=${new Date().getTime()}`;
        const respuestaLista = await fetch(urlApi);
        if (!respuestaLista.ok) throw new Error("No se pudo conectar con el repositorio");
        
        let archivos = await respuestaLista.json();
        // Filtrar solo los que sean notas Markdown
        archivos = archivos.filter(arch => arch.name.endsWith('.md'));

        if (archivos.length === 0) {
            contenedor.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-family: monospace;">[ DATABANK VACÍO - NO HAY NOTAS AÚN ]</p>';
            return;
        }

        // 2. Descargar el contenido de cada archivo .md
        const promesasNotas = archivos.map(arch => 
            fetch(arch.download_url + `?t=${new Date().getTime()}`)
            .then(r => r.text())
            .then(t => ({ nombre: arch.name, ...parsearNota(t) }))
        );
        
        let notasListas = await Promise.all(promesasNotas);

        // 3. Ordenar cronológicamente (las más nuevas primero)
        notasListas.sort((a, b) => new Date(b.datos.date || 0) - new Date(a.datos.date || 0));

        // 4. Aplicar el límite (ej. solo las 3 más recientes)
        if (limite) {
            notasListas = notasListas.slice(0, limite);
        }

        // 5. Inyectar el HTML en las páginas principales
        contenedor.innerHTML = notasListas.map(nota => {
            const fecha = new Date(nota.datos.date || Date.now()).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
            
            // Limpiar el texto markdown (quitar asteriscos, corchetes, etc.) para el pequeño resumen
            const resumen = nota.cuerpo.replace(/[#_*`>\[\]]/g, '').substring(0, 140) + '...';
            
            // Procesar la imagen (si existe)
            const rutaImagen = nota.datos.image ? (nota.datos.image.startsWith('/') ? nota.datos.image : '/' + nota.datos.image) : '';
            const boxImagen = rutaImagen 
                ? `<img src="${rutaImagen}" alt="${nota.datos.title}" style="width: 100%; height: 200px; object-fit: cover;">` 
                : `<div style="height: 200px; background: linear-gradient(135deg, #1a2a40, #3E8BFF); display: flex; align-items: center; justify-content: center; color: white; font-family: monospace; font-size: 0.9rem;">NOTKOMO DATABANK</div>`;

            return `
                <div style="background: var(--bg-alt, #fff); border: 1px solid rgba(62, 139, 255, 0.2); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 180, 216, 0.05); display: flex; flex-direction: column; transition: transform 0.3s; height: 100%;">
                    ${boxImagen}
                    <div style="padding: 25px; flex-grow: 1; display: flex; flex-direction: column;">
                        <h3 style="margin-top: 0; color: var(--primary-color, #3E8BFF); font-size: 1.3rem; font-weight: 800;">${nota.datos.title || 'Nota sin título'}</h3>
                        <p style="font-size: 0.85rem; color: var(--text-muted, #888); margin-bottom: 15px; font-family: monospace;">
                            ${fecha}
                        </p>
                        <div style="font-size: 0.95rem; color: var(--text-main, #333); margin-bottom: 25px; flex-grow: 1; line-height: 1.6;">
                            ${resumen}
                        </div>
                        <a href="bitacora.html?nota=${nota.nombre}" style="display: block; background: linear-gradient(135deg, #3E8BFF, #00B4D8); color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; text-align: center; font-size: 0.85rem; letter-spacing: 1px; transition: opacity 0.3s;">LEER COMPLETA</a>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-family: monospace;">[ ERROR DE CONEXIÓN CON DATABANK ]</p>';
    }
}
