 const router = require('express').Router()
 const {foodController, readAllFood, updateFood, deleteFood} = require('../controllers/foodController')


router.post('/insert' ,foodController.food )

router.get('/read' ,readAllFood.allFood )

router.put('/update' ,updateFood.newFood )

router.delete('/delete/:id' ,deleteFood.removeFood )


module.exports  = router