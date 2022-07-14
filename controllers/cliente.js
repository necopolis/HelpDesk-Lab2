const Cliente = require("../models").Cliente;
const Solicitud = require("../models").Solicitud;
const bcrypt = require("bcrypt");
const Empleado = require("../models").Empleado;
const { empleado } = require("./middleware");

//tareas de clientes

exports.index = async (request, response) =>{
    const cliente = await Cliente.findByPk(request.session.dni);
    var solicitudes = await Solicitud.findAll(
        {where:{dni_cliente : request.session.dni }
    });
    response.render("./cliente/index",{
        title: "Help Desk",
        user:cliente,
        cliente: cliente,
        solicitud: solicitudes,
        control:request.session,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError'),
        ticket: request.flash('ticket')
    });
}
exports.formSolicitud = async (request, response)=>{
    const cliente = await Cliente.findByPk(request.session.dni);
    response.render('./cliente/formSolicitud',{
        cliente: cliente,
        user:null
    });
}
exports.formActualizar = async (request, response) =>{
    var cliente = await Cliente.findByPk(request.session.dni);
    response.render("./cliente/formActualizar", {
        cliente: cliente,
        control:request.session,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError')
    });
}
exports.actualizar = async (request, response) =>{
    await Cliente.update({
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        celular: request.body.celular
    },
    {where:
        {dni: request.session.dni}
    });
    request.flash('mensaje', 'Usuario actualizado correctamente');
    response.redirect("/cliente");
}
exports.cambiarContraseña = async (request, response)=>{
    var salt = await bcrypt.genSalt(10);
    var cliente = await Cliente.findByPk(request.session.dni);
    var cv = await bcrypt.compare(request.body.antigua, cliente.contraseña);
    if(cv){
        var contraseña = await bcrypt.hash(request.body.nueva, salt);
        await Cliente.update({
            contraseña: contraseña
        },
            {where:{dni: request.session.dni}});
        request.flash('mensaje','Contraseña actualizada correctamente')
        response.redirect("/cliente");
    }
    else{
        request.flash('mensajeError','No se puedo actualizar la contraseña')
        response.redirect("/cliente");
    }
}
//Gestion de clientes

exports.listarDesac = async (request, response) =>{
    var empleado = await Empleado.findByPk(request.session.dni);
    var clientes = await Cliente.findAll();
    var a = clientes.length;
    response.render("./admin/cliente/index",{
        Clientes: clientes,
        user:empleado,
        control:request.session,
        cliT: a,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError')
    });
}
exports.desactivar = async (request, response) =>{
    var e = await Cliente.findByPk(request.params.id);
    var estadoNuevo;
    if(e.estado == true){
        estadoNuevo = 0;
        request.flash('mensaje', 'Cliente Desactivado');
    }
    else{
        estadoNuevo = 1;
        request.flash('mensaje', 'Cliente Activado');
    }
    await Cliente.update({
        estado: estadoNuevo,
    },{
        where: {dni: request.params.id}
    });
    response.redirect("/admin/cliente");
}