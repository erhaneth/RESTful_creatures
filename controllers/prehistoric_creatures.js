//import express
const express = require('express');

//create an express
const router = express.Router();
const fs = require('fs')

//show route for prehistoric_creatures

router.get('/prehistoric_creatures/:id', (req,res)=>{
    //get the array of creature from the json
    let creatures = fs.readFileSync('./prehistoric_creatures.json') 
    let creaturesData = JSON.parse(creatures)
    //identify the index of creatures in question
    let creatureIndex = req.params.id
    console.log(`grap ${creatureIndex} if you can`)
    
    res.render('prehistoric_creatures/show.ejs', {myCreatures : creaturesData[creatureIndex]})
})
//POST A NEW Creature ROUTE
router.post('/prehistoric_creatures', (req, res) => {
    //get the array of dinos from the json
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    //add the new dino to the array
    creatureData.push(req.body)

    //save the dinosaurs to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(dinoData))

    // redirect to the index route
    res.redirect('/prehistoric_creatures')
})
//get /creatures/edit/:id --- a view of form to edit a specific fino id
router.get('/edit/:id', (req, res) => {
    // res.send(`edit a dino @ ${req.params.id}`)
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    //render edit form
    res.render('prehistoric_creatures/edit.ejs', {
        creatureId: req.params.id,
        creature: creatureData[req.params.id]
    })

})
//PUT /dinosaurs/:id -- update a dino @ :id in the database
router.put('/:id', (req, res) => {
    //get dino from the dino json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    // console.log(req.params.id, req.body)

    //update the creature based on the req.params.id and the req.body
    //req.params = which creature
    //req.body = creature data to update
    creatureData[req.params.id].name = req.body.name
    creatureData[req.params.id].type = req.body.type

    //write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))


    //redirect to some place that has interesting data
    res.redirect('/prehistoric_creatures/')
    
})
//DELETE /creature/:id --- Destroy a dino @ :id
router.delete('/:id', (req, res) => {
    //get creatures from creature json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    //splice creature out of teh array (index from req.params)
    creatureData.splice(req.params.id, 1)

    //save the creature json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    //redirect to see all creatures
    res.redirect('/prehistoric_creatures')

    

})
module.exports = router;