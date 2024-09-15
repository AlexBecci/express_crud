const { pool } = require("../database/db");
const { getDriversService } = require("../service/driver.service");

//get drivers
const getDrivers= async(req,res)=>{
    const result = await getDriversService(req,res)
    return result
}

module.exports={getDrivers}