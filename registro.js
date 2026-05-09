// ==========================================
// REGISTER
// ==========================================

function Registrar() {
    let identificacion = prompt("REGISTRO: Ingrese su Identificación");
    let usuario = prompt("REGISTRO: Ingrese su nombre de Usuario");

    if (obtenerUsuario(usuario) !== null) {
        alert("Ese usuario ya existe. Intente con otro nombre.");
        MenuPrincipal();
        return;
    }

    let correo = prompt("REGISTRO: Ingrese su Correo electrónico");
    let clave = prompt("REGISTRO: Ingrese su Clave");
    let repetirClave = prompt("REGISTRO: Repita su Clave");

    if (clave !== repetirClave) {
        alert("Las claves no coinciden. Intente el registro de nuevo.");
        console.log("Error: Las claves no coinciden ❌");
        MenuPrincipal();
        return;
    }

    let saldoInicial = parseFloat(prompt("REGISTRO: Ingrese su Saldo Inicial"));

    if (isNaN(saldoInicial) || saldoInicial < 0) {
        alert("Saldo no válido. Debe ser un número positivo.");
        MenuPrincipal();
        return;
    }

    let nuevoUsuario = {
        identificacion: identificacion,
        usuario: usuario,
        correo: correo,
        clave: clave,
        saldo: saldoInicial,
        bloqueada: false,
        intentosFallidos: 0
    };

    guardarUsuario(nuevoUsuario);

    console.log("==========================================");
    console.log("  REGISTRO EXITOSO ✅");
    console.log("==========================================");
    console.log("Usuario:        " + usuario);
    console.log("Identificación: " + identificacion);
    console.log("Correo:         " + correo);
    console.log("Saldo inicial:  $" + saldoInicial);
    console.log("==========================================");

    alert("¡Registro exitoso! ✅\nBienvenido " + usuario);
    MenuPrincipal();
}
