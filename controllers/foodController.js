const FoodData = require('../models/foodModel')


// create
const foodController = {
    food : async (req,res) => {
        try {
            const foodName = req.body.foodName
            const days = req.body.days
            const photo = req.body.photo
            
            const allFoods = await FoodData({
                foodName , 
                daysSinceIEat:days, 
                photo
            })
            await allFoods.save()
            res.status(200).json({msg: "Data inserted "})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


//Read
const readAllFood = {
    allFood : async (req,res) => {
        try {
            const food = await FoodData.find({})
            res.status(200).json(food)
        } catch (error) {
            res.status(500).json({msg: "Internal server error"})
        }
        
    }
}

//Update
const updateFood = {
    newFood : async (req,res) => {
        try {
            const newFoodName = req.body.newFoodName
            const id = req.body.id

                 await FoodData.findById(id, (error, newUpdatedFoodName) => {
                newUpdatedFoodName.foodName = newFoodName
                newUpdatedFoodName.save()
                res.status(200).json({msg: "Data Updated "})
            })


        } catch (error) {
            res.status(500).json({msg: "Internal server error"})
        }
        
    }
}

//Delete
const deleteFood = {
    removeFood : async (req,res) => {
        try {
            const id = req.params.id

            await FoodData.findByIdAndRemove(id).exec()
            res.status(200).json({msg:"Food Deleted"})

        } catch (error) {
            res.status(500).json({msg: "Internal server error"})
        }
        
    }
}

module.exports= {foodController, readAllFood, updateFood, deleteFood}
