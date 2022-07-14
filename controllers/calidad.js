const Empleado = require('../models').Empleado;
const Notificaciones = require('../models').Notificacion;
const Area = require("../models").Area;

exports.index = async (request, response) =>{
    var empleado = await Empleado.findByPk(request.session.dni,
        {include: Area});
    var notificaciones = await Notificaciones.findAll( {where:{estado:"Pendiente"}});
    response.render("./calidad/index",{
        title: "Area de Calidad",
        empleado: empleado,
        user:empleado,
        pagina:"calidad",
        control:request.session,
        notific: notificaciones,
        a:  notificaciones.length,
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError')
    });
}