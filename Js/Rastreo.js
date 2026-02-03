function iniciarRastreo() {
    const codigo = document.getElementById("codigoRastreo").value.trim();

    if (codigo === "") {
        mostrarAlerta("Ingresa tu código de pedido", "Atención");
        return;
    }

    const tracker = document.getElementById("tracker");
    const statusBox = document.getElementById("statusBox");

    if (tracker) tracker.style.display = "flex";
    if (statusBox) statusBox.style.display = "block";

    trackOrder();
}

function trackOrder() {
    const steps = document.querySelectorAll(".progress-tracker .step");
    const statusText = document.querySelector(".status-text");
    const statusIcon = document.querySelector(".status-icon-large");

    const estados = [
        { texto: "Recibido", icono: "✓" },
        { texto: "En preparación", icono: "📦" },
        { texto: "En camino", icono: "🚚" },
        { texto: "Entregado", icono: "🎯" }
    ];

    let index = 0;

    steps.forEach(step => {
        step.classList.remove("active", "completed");
    });

    function avanzarEstado() {
        steps[index].classList.add("active");
        statusText.textContent = estados[index].texto;
        statusIcon.textContent = estados[index].icono;

        setTimeout(() => {
            steps[index].classList.remove("active");
            steps[index].classList.add("completed");
            index++;

            if (index < steps.length) {
                avanzarEstado();
            }
        }, 3000);
    }

    avanzarEstado();
}
