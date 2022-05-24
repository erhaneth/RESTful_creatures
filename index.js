//import express and express-ejs-layouts
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
// //import to use index route
const fs = require('fs')
//creating an instance of an express app
const app = express()

//middleware - translator
//tell express that iam using ejs as the view engine
app.set('view engine', 'ejs')

//tell my app that i am using ejs layouts 
app.use(ejsLayouts)

//body parser middleware
app.use(express.urlencoded({ extended: false }))
//allow non GET?POST methods from an HTML 5 form
app.use(methodOverride('_method'))

//controller- its rerouting traffic --- giving path
app.use('/dinosaurs', require('./controllers/dinosaurs'))

//home route - initial route === homepage
app.get('/', (req, res) => {
    res.render('home.ejs')
})

//index route - take you from home to dinosaurs
app.get('/dinosaurs', (req, res) => {
    //its reading  dinosaurs.json file 
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    
    //translation 'parse'
    
    let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)
    let nameFilter = req.query.nameFilter

    if (nameFilter) {
        dinoData = dinoData.filter(dino => dino.name.toLowerCase() === nameFilter.toLowerCase())
    }
     //send data(myDinos: dinoData) to client
    res.render('dinosaurs/index.ejs', { myDinos: dinoData })
})
//index route for prehistoric_creatures
app.get('/prehistoric_creatures', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)


    res.render('prehistoric_creatures/index.ejs', { myCreatures: creaturesData })
})

//new dino form route - when you add new dino
app.get('/dinosaurs/new', (req, res) => {
    //its responding 
    res.render('dinosaurs/new.ejs')
})

//new route cof prehistoric_creature
app.get('/prehistoric_creatures/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})


app.listen(8000, () => {
    console.log('cruddy dinos on port 8000')
})