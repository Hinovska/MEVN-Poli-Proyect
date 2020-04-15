const express = require("express");
const morgan = require("morgan");
const app = express();

//Settings
app.set('port', process.env.PORT || 5020);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/track', require('./routes/track'));
//Static files
app.use(express.static(__dirname + '/public'));

//Server is Listening
app.listen(app.get('port'), () => {
    console.log("Server on Port :" + app.get('port'));
});
