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

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// // Definir el modelo de datos -> Schema
// const Frases = mongoose.model('Frase', {
//   artista: String,
//   frase: String,
//   cancion: String,
// });

app.get('/', async (req, res) => {
  const getFrases = await db.collection('frases').find().sort({likes: -1}).toArray()
  res.render('index.ejs', { totalFrases: getFrases })
});

app.post('/anadirFrase', (req, res) => {
    db.collection('frases').insertOne({
      artista: req.body.artista,
      frase: req.body.frase,
      cancion: req.body.cancion,
      likes: 0,
    })
    .then(result => {
        console.log(`Artista ${req.body.artista} añadido`)
        res.redirect('/')
    })
    .catch(error => console.error(error))
});

app.delete('/eliminarFrase', (req, res) => {
    db.collection('frases').deleteOne({ frase: req.body.fraseJs })
  .then(result => {
    console.log('Frase eliminada')
    res.json('Frase eliminada')
})
  .catch(error => console.error(error))
})

app.put('/sumarLike', (req, res) => {
  db.collection('frases').findOneAndUpdate({ frase: req.body.fraseJs },{
    $set: {
      likes: req.body.likesJs + 1
    }
  },{
    upsert: false
  })
.then(result => {
  console.log('Liked')
  res.json('Liked')
})
.catch(error => console.error(error))
})


app.listen(PORT, () => {
  console.log(`El servidor está ejecutándose en el puerto ${PORT}`);
});