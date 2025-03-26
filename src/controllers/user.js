var User = require('../models/User');
var Attendance = require('../models/Attendance');
const { NotFoundError, BadRequestError } = require("../utils/errors");

//Save user
async function save(req, res){
    var data = req.body;

    try{
        var exists = await User.findOne({email: data.email}); //verify if exists
        if(exists) throw new Error('user_already_exists'); // throw error if exists
        console.log(exists);
        var user = new User({
            name: data.name,
            email: data.email,
            hourlyRate: data.hourlyRate
        })
        await user.save(); //Save user MongoDB

        return res.status(200).send({
            success: true,
            message: 'user_created',
            keyUser: user.keyUser
        })
    }catch(err){
        var errorResponse = {}
        switch(err.message){
            case 'user_already_exists':
                errorResponse.status = 400;
                errorResponse.message = "El usuario ya existe"
                break;
            default:
                errorResponse.status = 500;
                errorResponse.message = "Error desconocido"
                break;
        }
        return res.status(errorResponse.status).send({
            success: false,
            message: errorResponse.message
        })
    }
}

async function deleteUser(req, res){
    try{
        var deletedUser = await User.findOneAndDelete({keyUser: req.params.keyUser});
        if(!deletedUser) throw new Error("user_not_found");

        //Borrar registros de entrada y salida para conservar integridad:
        var deletedAttendance = await Attendance.deleteMany({userId: deletedUser._id});

        return res.status(200).send({
            success: true,
            deletedUser,
            deletedAttendance
        })
    }catch(err){
        var errorResponse = {}
        switch(err.message){
            case 'user_not_found':
                errorResponse.status = 404;
                errorResponse.message = "Usuario no encontrado"
                break;
            default:
                errorResponse.status = 500;
                errorResponse.message = "Error desconocido"
                break;
        }
        return res.status(errorResponse.status).send({
            success: false,
            message: errorResponse.message
        })
    }
}

module.exports = {
    save,
    deleteUser
}