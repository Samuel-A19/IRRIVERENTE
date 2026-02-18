function iniciarRastreo() {

    const codigo = document.getElementById("codigoRastreo").value.trim();

    if (codigo === "") {
        mostrarAlerta("Ingresa tu código de pedido", "Atención");
        return;
    }

    fetch(`api/buscar_pedido.php?codigo=${codigo}`)
        .then(res => res.json())
        .then(pedido => {

            if (!pedido) {
                mostrarAlerta("Pedido no encontrado", "Error");
                return;
            }

            const tracker = document.getElementById("tracker");
            const statusBox = document.getElementById("statusBox");

            if (tracker) tracker.style.display = "flex";
            if (statusBox) statusBox.style.display = "block";

            actualizarProgreso(parseInt(pedido.estado));

        })
        .catch(error => {
            console.error("Error buscando pedido:", error);
        });
}


function actualizarProgreso(estadoActual) {

    const steps = document.querySelectorAll(".progress-tracker .step");
    const statusText = document.querySelector(".status-text");
    const statusIcon = document.querySelector(".status-icon-large");

    const estados = [
        { texto: "Recibido", icono: "✓" },
        { texto: "En preparación", icono: "📦" },
        { texto: "En camino", icono: "🚚" },
        { texto: "Entregado", icono: "🎯" }
    ];

    steps.forEach((step, index) => {

        step.classList.remove("active", "completed");

        if (index < estadoActual) {
            step.classList.add("completed");
        }

        if (index === estadoActual) {
            step.classList.add("active");
        }
    });

    if (estados[estadoActual]) {
        statusText.textContent = estados[estadoActual].texto;
        statusIcon.textContent = estados[estadoActual].icono;
    }
}
