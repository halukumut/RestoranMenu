const express = require('express');
const mongoose = require('mongoose');
const Urun = require('./models/urun');
const Log = require('./models/log');
const bodyParser = require('body-parser');

// express app
const app = express();

// connect to MongoDB
const dbURI='mongodb+srv://tester:tester123@menu.5y5ixvy.mongodb.net/'
mongoose.connect(dbURI)
  .then((result)=>{
   console.log('CONNECTED TO DB');
   app.listen(3000);
})
  .catch((err)=>{console.log(err)});

// register view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/api/uruns/:id',async (req,res)=>{
  const urun = await Urun.findById(req.params.id);
  res.json(urun);
})

app.get('/api/uruns', async (req,res)=>{
  Urun.find()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>console.log(err));
})

app.get('/api/logs/:id',async (req,res)=>{
  const log = await Log.findById(req.params.id);
  res.json(log);
})

app.get('/api/logs/',async (req,res)=>{
  Log.find()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>console.log(err));
})

app.post('/update/:id', async (req, res) => { 
  const urunId = req.params.id;
  const updatedUrunData = req.body;

  try {
    const updatedUrun = await Urun.findByIdAndUpdate(urunId, updatedUrunData);

    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/menu',(req,res)=>{
  Urun.find(null,null,{limit:2})
  .then((result)=>{
    res.render('anamenu',{title:"menu",data: result})
  })
  .catch((err)=>console.log(err))
})

app.get('/login',(req,res)=>{
  res.render('login');
})

app.get('/', (req, res) => {
  res.redirect('/menu');
});

app.get('/icecek',(req,res)=>{
  Urun.find({tur:'icecek'})
  .then((result)=>{
    res.render('icecekler',{title: 'drinks',drinks: result})
  })
  .catch((err)=>console.log(err))
})

app.get('/yiyecek',(req,res)=>{
  Urun.find({tur:'yiyecek'})
  .then((result)=>{
    res.render('yiyecekler',{title: 'edibles',edibles: result})
  })
  .catch((err)=>console.log(err))
})

app.get('/admin',(req,res)=>{
  Urun.find()
  .then((result)=>{
    res.render('admin',{title: 'ADMIN',uruns:result})
  })
})

app.get('/edit/:id',(req,res)=>{
  Urun.findById(req.params.id)
  .then((result)=>{
    res.render('edit',{title: 'EDIT',urun: result,isEditPage: true})
  })
  .catch((err)=>console.log(err))
})

app.get('/ekle',(req,res)=>{
  res.render('ekle')
})

app.get('/add', async (req, res) => {
  const urun = new Urun({
    ad:'0',
    img:'0',
    fiyat:'0',
    tur:'yiyecek'
  });
  urun.save()
  .then(()=>res.redirect('/admin'))
  .catch((err)=>{console.log(err)})
});

app.get('/delete/:id',(req,res)=>{
  console.log('Calisiyor');
  Urun.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect('/admin')
  });
    console.log('basarili');
  })

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});