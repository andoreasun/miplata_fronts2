// ==========================================
// MENUS
// ==========================================

function MenuTransacciones() {
    let opcion = prompt(
        "--- CONSULTAS Y MOVIMIENTOS ---\n" +
        "Usuario: " + usuarioActivo.usuario + "\n" +
        "Saldo:   $" + usuarioActivo.saldo + "\n\n" +
        "1. Retirar\n" +
        "2. Consultar Saldo\n" +
        "3. Consignar\n" +
        "4. Consultar Movimientos\n" +
        "5. Transferir a otro usuario\n" +
        "6. Salir\n\n" +
        "Seleccione una opción:"
    );

    if (opcion === "1") {
        Retirar();
        MenuTransacciones();
    } else if (opcion === "2") {
        ConsultarSaldo();
        MenuTransacciones();
    } else if (opcion === "3") {
        Consignar();
        MenuTransacciones();
    } else if (opcion === "4") {
        ConsultarMovimientos();
        MenuTransacciones();
    } else if (opcion === "5") {
        Transferir();
        MenuTransacciones();
    } else if (opcion === "6") {
        console.log("Sesión cerrada. ¡Hasta luego " + usuarioActivo.usuario + "! 👋");
        alert("Sesión cerrada. ¡Hasta luego " + usuarioActivo.usuario + "!");
        usuarioActivo = null;
        intentos = 0;
        MenuPrincipal();
    } else {
        alert("Opción no válida. Intente de nuevo.");
        MenuTransacciones();
    }
}

function MenuPrincipal() {
    let opcion = prompt(
        "==========================================\n" +
        "        BANCO MI PLATA\n" +
        "==========================================\n" +
        "1. Iniciar\n" +
        "2. Registrar\n" +
        "3. Elija Respuesta (Validar)\n\n" +
        "Seleccione una opción:"
    );

    if (opcion === "1") {
        Iniciar();
    } else if (opcion === "2") {
        Registrar();
    } else if (opcion === "3") {
        let userValidar = prompt("VALIDAR\nIngrese el nombre de usuario a verificar:");
        let encontrado = obtenerUsuario(userValidar);
        if (encontrado !== null) {
            alert("✅ El usuario '" + userValidar + "' SÍ está registrado en el sistema.");
            console.log("Usuario '" + userValidar + "' encontrado ✅");
        } else {
            alert("❌ El usuario '" + userValidar + "' NO está registrado en el sistema.");
            console.log("Usuario '" + userValidar + "' no encontrado ❌");
        }
        MenuPrincipal();
    } else {
        alert("Opción no válida.");
        MenuPrincipal();
    }
}
