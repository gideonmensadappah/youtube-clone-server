const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));

const Users =  require('./routes/Users');
const Videos =  require('./routes/Videos');

app.use('/users', Users);
app.use('/videos', Videos);


app.get('/',(req, res)=> {
        res.send('start')
})



app.listen(port, ()=>console.log(`on port ${port}...`));
