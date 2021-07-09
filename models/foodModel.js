const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    foodName:{
        type: "String",
        required:true
    },
    daysSinceIEat:{
        type: "number",
        default:true
    },
    photo:{
        type: "String",
        required:true
    }
})
module.exports = mongoose.model("FoodData", foodSchema)