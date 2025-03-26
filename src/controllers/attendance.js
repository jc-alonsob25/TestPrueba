var User = require("../models/User");
var Attendance = require("../models/Attendance");
const mongoose = require('mongoose');


async function checkInCheckOut(req, res){
    var data = req.body;
    try{
        var existsUser = await User.findOne({keyUser: req.params.keyUser});
        if(!existsUser) throw new Error('user_not_found');

        var checkIn = new Date(data.checkIn);
        var checkOut = new Date(data.checkOut);
        if(checkOut <= checkIn) throw new Error('compare_dates');

        //Validate if is already registered today
        const result = await Attendance.aggregate([
            {
              $match: {
                userId: new mongoose.Types.ObjectId(existsUser._id),
                checkIn: { $gte: checkIn, $lt: checkOut }
              }
            }
        ]);
        if(result.length > 0) throw new Error('exists_attendance');

        var attendance = new Attendance({
            userId: existsUser._id,
            checkIn,
            checkOut
        })
        await attendance.save();
        return res.status(200).send({
            success: true,
            checkIn,
            checkOut
        })
    }catch(err){
        var errorResponse = {}
        switch(err.message){
            case 'compare_dates':
                errorResponse.status = 400;
                errorResponse.message = "La fecha de salida no puede ser menor a la de entrada"
                break;
            case 'exists_attendance':
                errorResponse.status = 400;
                errorResponse.message = "Ya tienes asistencia el dia de hoy"
                break;
            case 'user_not_found':
                errorResponse.status = 404;
                errorResponse.message = "Usuario no encontrado"
                break;
            default:
                errorResponse.status = 500;
                errorResponse.message = "Error desconocido"
                break;
        }
        console.log(err);
        return res.status(errorResponse.status).send({
            success: false,
            message: errorResponse.message
        })
    }
}

function calculateHours(attendance, hourlyRate){
    var totalExtraHours = 0;
    var totalRegularHours = 0;
    var totalPayRoll = 0;
    var arrayAttendance = [];
    attendance.forEach(element => {
        var checkIn = new Date(element.checkIn);
        var checkOut = new Date(element.checkOut);
        var difference = checkOut - checkIn;
        var hoursPerDay = parseInt(difference / (1000 * 60 * 60)); //Quitar parseInt si se requiere un calculo mas exacto
        var totalPerDay = 0;
        var extraHours = 0;
        var regularHours = 0;
        console.log("Hours per day: ", hoursPerDay);
        if(hoursPerDay > 8){
            extraHours = hoursPerDay - 8;
            totalExtraHours+= extraHours;
            regularHours = hoursPerDay - extraHours;
            totalRegularHours+= regularHours;
            totalPerDay = (hourlyRate * regularHours) + (extraHours * (hourlyRate * 1.5));
        }else{
            regularHours = hoursPerDay;
            totalRegularHours+= regularHours;
            totalPerDay = hourlyRate * hoursPerDay;
        }
        console.log("TotalPerDay: ", totalPerDay);
        totalPayRoll+= totalPerDay;

        var newAttendance = {
            checkIn: element.checkIn,
            checkOut: element.checkOut,
            extraHours: extraHours,
            regularHours: regularHours,
            totalPerDay: totalPerDay
        }
        arrayAttendance.push(newAttendance);
    });
    console.log("Extra hours: ", totalExtraHours);
    console.log("Normal hours: ", totalRegularHours);
    console.log("Total PayRoll: ", totalPayRoll);
    return {
        arrayAttendance,
        totalPayRoll
    }
}

async function calculatePayRoll(req, res){
    var data = req.body;
    try{
        var user = await User.findOne({keyUser: req.params.keyUser});
        if(!user) throw new Error ('user_not_found');

        var firstDate = new Date(data.firstDate);
        var secondDate = new Date(data.secondDate);
        secondDate.setHours(23, 59, 59, 59);
        console.log(firstDate);
        console.log(secondDate);
        var attendance = await Attendance.find({userId: user._id, checkIn: { $gte: firstDate, $lt: secondDate } });

        var result = calculateHours(attendance, user.hourlyRate);
        return res.status(200).send({
            success: true,
            user: user.name,
            totalPayRoll: result.totalPayRoll,
            records: result.arrayAttendance
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
    calculatePayRoll,
    checkInCheckOut
}