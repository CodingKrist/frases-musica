// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// require('dotenv').config()

// const PORT = 8000;

// app.use(express.urlencoded ({ extended:true }))



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.DB_STRING;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     // Obtener la conexión a la base de datos
//     const db = client.db('musica');
//     //const quotesCollection = db.collection('quotes');)


//     app.get('/', (req, res) => {
//         res.sendFile('index.html', { root: __dirname })
//     })
    
//     app.post('/anadirFrase', (req, res) => {
//         //console.log(req.body)
//         db.collection('frases')
//             .insertOne({
//                 artista: req.body.artista,
//                 frase: req.body.frase,
//                 cancion: req.body.cancion
//         })
//         .then(result => {
//             console.log(`Artista ${req.body.artista} añadido`)
//             res.redirect('/')
//         })
//         .catch(error => console.error(error))
//     })

//     app.listen(process.env.PORT || PORT, () => {
//         console.log(`The server is running on port ${PORT}`)
//       })
    

//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.DB_STRING;

// Conectar a MongoDB con Mongoose
mongoose.connect(MONGODB_URI, {
  dbName: 'musica',
});

const db = mongoose.connection;

// Manejar eventos de conexión
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a la base de datos MongoDB');
});

app.use(express.urlencoded({ extended: true }));

// // Definir el modelo de datos
// const Frases = mongoose.model('Frase', {
//   artista: String,
//   frase: String,
//   cancion: String,
// });

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.post('/anadirFrase', (req, res) => {
    db.collection('frases').insertOne({
      artista: req.body.artista,
      frase: req.body.frase,
      cancion: req.body.cancion,
    })
    .then(result => {
        console.log(`Artista ${req.body.artista} añadido`)
        res.redirect('/')
    })
    .catch(error => console.error(error))
});

app.listen(PORT, () => {
  console.log(`El servidor está ejecutándose en el puerto ${PORT}`);
});