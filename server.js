const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://pjosh0523:Dcnjtra7@cluster0.hrwpj.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('root-factions')
    const colorCollection = db.collection('color')
    app.get('/',(request,response)=>{
        response.sendFile(__dirname + '/index.html')
    })
    app.use(bodyParser.urlencoded({ extended: true }))
    app.post('/factions', (req, res) => {
        colorCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
      })
    app.listen(PORT, ()=>{
        console.log(`The server is running on port ${PORT}`)
    })
  })
  .catch(error => console.error(error))

