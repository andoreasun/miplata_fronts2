// ==========================================
// LOGIN
// ==========================================

let intentos = 0;
let usuarioActivo = null;

function Iniciar() {
    let userEntrada = prompt("INICIAR SESIÓN\nUsuario:");
    let claveEntrada = prompt("INICIAR SESIÓN\nClave:");

    let usuario = obtenerUsuario(userEntrada);

    if (usuario === null) {
        intentos = intentos + 1;
        alert("Usuario no encontrado.\nIntento " + intentos + " de 3");
        console.log("Usuario no encontrado. Intento " + intentos + " de 3 ❌");

        if (intentos >= 3) {
            alert("Cuenta bloqueada por 24 horas, comunícate con tu banco");
            console.log("Cuenta bloqueada por 24 horas, comunícate con tu banco ❌");
            return;
        }
        MenuPrincipal();
        return;
    }

    if (usuario.bloqueada) {
        alert("Cuenta bloqueada por 24 horas, comunícate con tu banco");
        console.log("Cuenta bloqueada ❌");
        return;
    }

    if (userEntrada === usuario.usuario && claveEntrada === usuario.clave) {
        intentos = 0;
        usuario.intentosFallidos = 0;
        guardarUsuario(usuario);
        usuarioActivo = usuario;

        console.log("==========================================");
        console.log("  BIENVENIDO " + usuario.usuario.toUpperCase());
        console.log("==========================================");
        console.log("Saldo actual: $" + usuario.saldo);
        console.log("==========================================");

        MenuTransacciones();

    } else {
        intentos = intentos + 1;
        usuario.intentosFallidos = usuario.intentosFallidos + 1;
        guardarUsuario(usuario);

        alert("Datos incorrectos.\nIntento " + intentos + " de 3");
        console.log("Datos incorrectos. Intento " + intentos + " de 3 ❌");

        if (intentos >= 3) {
            usuario.bloqueada = true;
            guardarUsuario(usuario);
            alert("Cuenta bloqueada por 24 horas, comunícate con tu banco");
            console.log("Cuenta bloqueada por 24 horas, comunícate con tu banco ❌");
        } else {
            MenuPrincipal();
        }
    }
}
