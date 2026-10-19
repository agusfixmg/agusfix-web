
const WHATSAPP_NUMBER = "5491122951854";

// ============================================================
// Año en el footer
// ============================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================================
// Animaciones al hacer scroll (GSAP + ScrollTrigger)
// ============================================================
gsap.registerPlugin(ScrollTrigger);

// Anima cada sección principal de la página (hero, servicios,
// cotizador, cómo funciona, contacto) con un fade + slide hacia
// arriba a medida que entra en pantalla.
const secciones = document.querySelectorAll("main > section");

secciones.forEach((seccion) => {
  gsap.from(seccion, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: seccion,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
});

// ============================================================
// Galería de trabajos — visor ampliado (lightbox)
// ============================================================
const workItems = Array.from(document.querySelectorAll(".work-item"));
const lightbox = document.getElementById("lightbox");

if (workItems.length && lightbox) {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const btnClose = document.getElementById("lightbox-close");
  const btnPrev = document.getElementById("lightbox-prev");
  const btnNext = document.getElementById("lightbox-next");

  let currentIndex = 0;

  function abrirTrabajo(index) {
    currentIndex = index;
    const item = workItems[currentIndex];
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function cerrarLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  function mostrarSiguiente(paso) {
    currentIndex = (currentIndex + paso + workItems.length) % workItems.length;
    abrirTrabajo(currentIndex);
  }

  workItems.forEach((item, index) => {
    item.addEventListener("click", () => abrirTrabajo(index));
  });

  btnClose.addEventListener("click", cerrarLightbox);
  btnPrev.addEventListener("click", () => mostrarSiguiente(-1));
  btnNext.addEventListener("click", () => mostrarSiguiente(1));

  // cerrar al hacer click fuera de la imagen
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) cerrarLightbox();
  });

  // navegación por teclado
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") cerrarLightbox();
    if (event.key === "ArrowLeft") mostrarSiguiente(-1);
    if (event.key === "ArrowRight") mostrarSiguiente(1);
  });
}

// ============================================================
// Botón de contacto directo
// ============================================================
const directLink = document.getElementById("whatsapp-direct");
if (directLink) {
  const mensajeDirecto = "Hola! Quiero consultar por una reparación.";
  directLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeDirecto)}`;
}

// ============================================================
// Formulario de diagnóstico
// ============================================================
const form = document.getElementById("quote-form");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const dispositivo = document.getElementById("dispositivo").value;
    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const problema = document.getElementById("problema").value;
    const detalle = document.getElementById("detalle").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const zona = document.getElementById("zona").value.trim();

    const lineas = [
      "Hola! Quiero consultar por una reparación.",
      "",

      `Dispositivo: ${dispositivo}`,
      "",

      `Marca / modelo: ${marca} ${modelo}`,
      "",

      `Problema: ${problema}`,
    ];

    if (detalle) lineas.push(`Detalle: ${detalle}`);
    if (zona) lineas.push(`Zona: ${zona}`);
    lineas.push(`Nombre: ${nombre}`);

    const mensaje = lineas.join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank", "noopener");
  });
}
