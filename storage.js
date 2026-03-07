// ==========================================
// STORAGE
// ==========================================

function guardarUsuario(usuario) {
    localStorage.setItem("usuario_" + usuario.usuario, JSON.stringify(usuario));
}

function obtenerUsuario(nombreUsuario) {
    let datos = localStorage.getItem("usuario_" + nombreUsuario);
    if (datos !== null) {
        return JSON.parse(datos);
    }
    return null;
}

function guardarMovimientos(nombreUsuario, movimientos) {
    localStorage.setItem("movimientos_" + nombreUsuario, JSON.stringify(movimientos));
}

function obtenerMovimientos(nombreUsuario) {
    let datos = localStorage.getItem("movimientos_" + nombreUsuario);
    if (datos !== null) {
        return JSON.parse(datos);
    }
    return [];
}
