# PRD — Pamela González · Portafolio Fisioterapeuta (Motion Site 3D)

## Problema original
Portafolio personal premium, one-page, con experiencia 3D y motion design de alto nivel para Pamela González, fisioterapeuta costarricense (finalizando la Licenciatura en la Universidad Santa Paula). Nivel Awwwards/motion studio, todo en español, solo frontend, contacto por WhatsApp.

## Decisiones del usuario
- Mantener la base React existente del entorno (CRA) con Three.js, GSAP, Lenis y Framer Motion.
- Foto profesional: placeholder elegante con iniciales "PG", marco editorial y grano (reemplazable).
- Contacto: solo WhatsApp y teléfono (8984-6677 → https://wa.me/50689846677, tel:+50689846677).
- Pedido extra: "mucha animación movimiento, estilo presentación o motionsite 3d".
- Pedido extra 2: las formas flotantes deben leerse como una espina dorsal que empieza suelta y se une al bajar hasta formarse por completo.
- Pedido extra 3: hacer la espina más larga.

## Dirección de arte
- Concepto: "Movimiento que se alinea". Clínico cálido, lujo silencioso.
- Paleta: fondo #0E1412, superficie #151D1A, salvia #8FAF9A, hueso #EFE9DF, cobre #C9936B.
- Tipografía: Instrument Serif (titulares, itálicas editoriales) + Manrope (cuerpo/UI).
- Detalles: grano sutil global, líneas 1px, numeración editorial 01—07, cursor personalizado, botones magnéticos, marquee editorial lento.

## Arquitectura (frontend puro, sin backend)
- React (CRA + craco) + Tailwind; Three.js vía @react-three/fiber + drei; GSAP + ScrollTrigger; Lenis (scroll suave ligado al ticker de GSAP); Framer Motion (reveals, micro-interacciones, menú, testimonios).
- `src/content.js`: TODO el contenido editable (servicios, casos, formación, testimonios, contacto) con placeholders [— editar].
- `SpineScene.jsx`: 16 cápsulas (12 móvil) con MeshPhysicalMaterial vidrio esmerilado salvia, curva espinal en S, unión secuencial vértebra a vértebra durante ~3 pantallas de scroll, drift ambiental hacia el borde, partículas Sparkles, parallax de mouse, DPR máx 1.25, lazy-loaded, fade-out en Formación. Reduced-motion: sin 3D.
- Secciones: 01 Hero (reveal letra a letra), Marquee, 02 Sobre mí (placeholder foto + cita palabra a palabra + 3 pilares), 03 Servicios (lista expandible 01–06), 04 Casos (pin horizontal GSAP + barra de progreso, placeholders), 05 Formación (timeline con línea que se dibuja y nodos que encienden), 06 Testimonios (fondo hueso, fade+blur, 01/03), 07 Contacto (formulario → WhatsApp prellenado, botón magnético) + footer con volver arriba.
- SEO: title "Pamela González — Fisioterapeuta", meta description, Open Graph, favicon SVG original (vértebras alineándose).

## Estado
Implementado y verificado (2026): loader con contador y cortina, hero con reveal enmascarado, espina 3D larga con formación por scroll, todas las secciones 01–07, menú móvil en cascada, formulario con URL de WhatsApp verificada (encoding correcto), sin overflow horizontal en 1440/390, fondo del body alterna a hueso en Testimonios.

## Pendientes / decisiones
- La usuaria debe reemplazar: foto (placeholder PG), años/instituciones de Cursos/Certificaciones/Seminarios, textos de casos y testimonios (marcados [— editar]), links de redes sociales.
- No hay backend ni base de datos (por diseño, edición vía content.js).
