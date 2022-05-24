//import express
const express = require('express');

//create an express
const router = express.Router();
const fs = require('fs')

//SHOW ROUTE (a specific  dinosaur)
router.get('/dinosaurs/:id', (req, res) => {
    //get the array of dinos from the json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //identify the index of dino in question
    let dinoIndex = req.params.id
    console.log(`this is the dino you want to grap ${dinoIndex} if you can`)
    //isolate the dino in question
    // console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show.ejs', { myDino: dinoData[dinoIndex] })
})
//POST A NEW DINO ROUTE
router.post('/dinosaurs', (req, res) => {
    //get the array of dinos from the json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //add the new dino to the array
    dinoData.push(req.body)

    //save the dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to the index route
    res.redirect('/dinosaurs')
})



//get /dinosaurs/edit/:id --- a view of form to edit a specific fino id
router.get('/edit/:id', (req, res) => {
    // res.send(`edit a dino @ ${req.params.id}`)
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    //render edit form
    res.render('dinosaurs/edit.ejs', {
        dinoId: req.params.id,
        dino: dinoData[req.params.id]
    })

})
//PUT /dinosaurs/:id -- update a dino @ :id in the database
router.put('/:id', (req, res) => {
    //get dino from the dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    console.log(req.params.id, req.body)

    //update the dino based on the req.params.id and the req.body
    //req.params = which dino
    //req.body = dino data to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    //write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))


    //redirect to some place that has interesting data
    res.redirect('/dinosaurs/')
    // res.send(`update a dino @ ${req.params.id}`)
})

//DELETE /dinosaurs/:id --- Destroy a dino @ :id
router.delete('/:id', (req, res) => {
    //get dinos from dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    //splice dino out of teh array (index from req.params)
    dinoData.splice(req.params.id, 1)

    //save the dino json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    //redirect to see all dinos
    res.redirect('/dinosaurs')

    // res.send(`destroy a dino @ ${req.params.id}`)


})

//export the router

module.exports = router;