async function fetchExternalCapsule() {
    try {
        const quoteResponse = await fetch('https://api.quotable.io/random');
        const quoteData = await quoteResponse.json();
        const factResponse = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        const factData = await factResponse.json();
        const capsule = {
            fecha: new Date().toISOString().split("T")[0],
            dato: factData.text || "Dato curioso por defecto",
            datoZoom: "Dato obtenido de una API externa o por defecto.",
            cita: quoteData.content || "Cita por defecto",
            citaZoom: `Autor: ${quoteData.author || "Desconocido"}`,
            recurso: "Explora más en Quotable.io y UselessFacts."
        };
        capsulas[idiomaActual].push(capsule);
        localStorage.setItem("capsulas", JSON.stringify(capsulas));
    } catch (error) {
        console.error("Error al obtener cápsula externa:", error);
        const fallbackCapsule = {
            fecha: new Date().toISOString().split("T")[0],
            dato: "La Tierra orbita al Sol a 107,000 km/h.",
            datoZoom: "Este dato es una curiosidad astronómica básica.",
            cita: "El conocimiento es poder. - Francis Bacon",
            citaZoom: "Una cita clásica sobre el valor del aprendizaje.",
            recurso: "Lee más sobre astronomía."
        };
        capsulas[idiomaActual].push(fallbackCapsule);
        localStorage.setItem("capsulas", JSON.stringify(capsulas));
    }
}
