const Empleado = require("../models").Empleado;
const Area = require("../models").Area;
exports.index = async (request, response)=>{
    var empleado = await Empleado.findByPk(request.session.dni,
        {include: Area});
    response.render('./admin/index',{ 
        title: "Area de Gestión",
        user: empleado,
        control:request.session,
        pagina:"admin",
        mensaje: request.flash('mensaje'),
        mensajeError: request.flash('mensajeError')
    });
}