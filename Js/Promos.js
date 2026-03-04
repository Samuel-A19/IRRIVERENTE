/* ========================================
   HANDLERS PARA EDITAR/ELIMINAR PROMOS
======================================== */

document.addEventListener('DOMContentLoaded', function () {
    attachPromoHandlers();
});

function attachPromoHandlers() {
    const container = document.getElementById('promosContainer');
    if (!container) return;

    // Delete handler
    container.querySelectorAll('.promo .btn-delete').forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            const promo = this.closest('.promo');
            const id = promo.dataset.id;
            if (!id) return;

            confirmar('¿Confirmas eliminar esta promoción?', 'Eliminar Promoción').then(result => {
                if (!result) return;

                fetch('/IRRIVERENTE/api/eliminar_producto.php', {
                    method: 'POST',
                    body: new URLSearchParams({ id })
                })
                    .then(r => r.text())
                    .then(t => {
                        if (t.trim() === 'ok') {
                            if (typeof reloadPromos === 'function') reloadPromos();
                            if (typeof mostrarAlerta === 'function') mostrarAlerta('Promoción eliminada', 'Éxito');
                        } else {
                            if (typeof mostrarAlerta === 'function') mostrarAlerta('Error al eliminar', 'Error');
                        }
                    })
                    .catch(err => console.error(err));
            });
        };
    });

    // Edit handler
    container.querySelectorAll('.promo .btn-edit').forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            const promo = this.closest('.promo');
            const id = promo.dataset.id;
            const name = promo.dataset.name || '';
            const desc = promo.dataset.desc || '';
            const price = promo.dataset.price || '';
            const category = promo.dataset.cat || '';

            document.getElementById('tipoAdmin').value = 'promo';
            document.getElementById('idAdmin').value = id;
            document.getElementById('tituloInput').value = name;
            document.getElementById('descripcionInput').value = desc;
            document.getElementById('precioInput').value = price;
            document.getElementById('categoriaInput').value = category;

            if (typeof abrirModalAdmin === 'function') abrirModalAdmin('promo');
        };
    });
}

