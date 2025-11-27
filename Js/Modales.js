/* MODALES (open, close, switch) */
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}
function switchModal(current, target) {
    closeModal(current);
    openModal(target);
}

window.onclick = function (event) {
    const modals = ['loginModal', 'registerModal', 'recoverModal'];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (event.target === modal) modal.style.display = "none";
    });
};
