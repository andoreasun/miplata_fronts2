// ==========================================
// TRANSACTIONS
// ==========================================

function ConsultarSaldo() {
    console.log("==========================================");
    console.log("  CONSULTA DE SALDO");
    console.log("==========================================");
    console.log("Usuario:      " + usuarioActivo.usuario);
    console.log("Saldo actual: $" + usuarioActivo.saldo);
    console.log("==========================================");
    alert("Saldo actual: $" + usuarioActivo.saldo);
}

function Retirar() {
    let monto = parseFloat(prompt("RETIRO\nIngrese el monto a retirar:"));

    if (isNaN(monto) || monto <= 0) {
        alert("Monto no válido. Debe ser un número positivo.");
        console.log("Error: monto no válido ❌");
        return;
    }

    if (monto > usuarioActivo.saldo) {
        alert("Saldo insuficiente.\nSu saldo es: $" + usuarioActivo.saldo);
        console.log("Retiro rechazado: saldo insuficiente ❌");
        return;
    }

    usuarioActivo.saldo = usuarioActivo.saldo - monto;
    guardarUsuario(usuarioActivo);

    let movimientos = obtenerMovimientos(usuarioActivo.usuario);
    let fecha = new Date();
    movimientos.push({
        fecha: fecha.toLocaleString(),
        concepto: "Retiro",
        valor: monto,
        saldo: usuarioActivo.saldo
    });
    guardarMovimientos(usuarioActivo.usuario, movimientos);

    console.log("==========================================");
    console.log("  RETIRO EXITOSO ✅");
    console.log("==========================================");
    console.log("Monto retirado: $" + monto);
    console.log("Nuevo saldo:    $" + usuarioActivo.saldo);
    console.log("==========================================");
    alert("Retiro exitoso ✅\nMonto: $" + monto + "\nNuevo saldo: $" + usuarioActivo.saldo);
}

function Consignar() {
    let monto = parseFloat(prompt("CONSIGNACIÓN\nIngrese el monto a consignar:"));

    if (isNaN(monto) || monto <= 0) {
        alert("Monto no válido. Debe ser un número positivo.");
        console.log("Error: monto no válido ❌");
        return;
    }

    usuarioActivo.saldo = usuarioActivo.saldo + monto;
    guardarUsuario(usuarioActivo);

    let movimientos = obtenerMovimientos(usuarioActivo.usuario);
    let fecha = new Date();
    movimientos.push({
        fecha: fecha.toLocaleString(),
        concepto: "Consignación",
        valor: monto,
        saldo: usuarioActivo.saldo
    });
    guardarMovimientos(usuarioActivo.usuario, movimientos);

    console.log("==========================================");
    console.log("  CONSIGNACIÓN EXITOSA ✅");
    console.log("==========================================");
    console.log("Monto consignado: $" + monto);
    console.log("Nuevo saldo:      $" + usuarioActivo.saldo);
    console.log("==========================================");
    alert("Consignación exitosa ✅\nMonto: $" + monto + "\nNuevo saldo: $" + usuarioActivo.saldo);
}

function ConsultarMovimientos() {
    let movimientos = obtenerMovimientos(usuarioActivo.usuario);

    console.log("==========================================");
    console.log("  CONSULTA DE MOVIMIENTOS");
    console.log("==========================================");
    console.log("Fecha y Hora | Concepto | Valor | Saldo");
    console.log("------------------------------------------");

    if (movimientos.length === 0) {
        console.log("No hay movimientos registrados.");
        alert("No hay movimientos registrados.");
        return;
    }

    let texto = "--- TUS MOVIMIENTOS ---\n\n";
    let i = 0;
    while (i < movimientos.length) {
        let mov = movimientos[i];
        console.log(mov.fecha + " | " + mov.concepto + " | $" + mov.valor + " | $" + mov.saldo);
        texto = texto + mov.fecha + "\n";
        texto = texto + mov.concepto + " | $" + mov.valor + "\n";
        texto = texto + "Saldo: $" + mov.saldo + "\n";
        texto = texto + "-------------------\n";
        i++;
    }

    console.log("==========================================");
    alert(texto);
}

function Transferir() {
    let destinatario = prompt("TRANSFERENCIA\nIngrese el usuario destinatario:");
    let usuarioDestino = obtenerUsuario(destinatario);

    if (usuarioDestino === null) {
        alert("El usuario destinatario no existe.");
        console.log("Error: usuario destinatario no encontrado ❌");
        return;
    }

    if (destinatario === usuarioActivo.usuario) {
        alert("No puedes transferirte dinero a ti mismo.");
        return;
    }

    let monto = parseFloat(prompt("TRANSFERENCIA\nIngrese el monto a transferir:"));

    if (isNaN(monto) || monto <= 0) {
        alert("Monto no válido. Debe ser un número positivo.");
        return;
    }

    if (monto > usuarioActivo.saldo) {
        alert("Saldo insuficiente.\nSu saldo es: $" + usuarioActivo.saldo);
        console.log("Transferencia rechazada: saldo insuficiente ❌");
        return;
    }

    usuarioActivo.saldo = usuarioActivo.saldo - monto;
    guardarUsuario(usuarioActivo);

    usuarioDestino.saldo = usuarioDestino.saldo + monto;
    guardarUsuario(usuarioDestino);

    let fecha = new Date();
    let movOrigen = obtenerMovimientos(usuarioActivo.usuario);
    movOrigen.push({
        fecha: fecha.toLocaleString(),
        concepto: "Transferencia enviada a " + destinatario,
        valor: monto,
        saldo: usuarioActivo.saldo
    });
    guardarMovimientos(usuarioActivo.usuario, movOrigen);

    let movDestino = obtenerMovimientos(destinatario);
    movDestino.push({
        fecha: fecha.toLocaleString(),
        concepto: "Transferencia recibida de " + usuarioActivo.usuario,
        valor: monto,
        saldo: usuarioDestino.saldo
    });
    guardarMovimientos(destinatario, movDestino);

    console.log("==========================================");
    console.log("  TRANSFERENCIA EXITOSA ✅");
    console.log("==========================================");
    console.log("Destinatario:  " + destinatario);
    console.log("Monto enviado: $" + monto);
    console.log("Nuevo saldo:   $" + usuarioActivo.saldo);
    console.log("==========================================");
    alert("Transferencia exitosa ✅\nDestinatario: " + destinatario + "\nMonto: $" + monto + "\nNuevo saldo: $" + usuarioActivo.saldo);
}