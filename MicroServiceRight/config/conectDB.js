/** Conexion a base de datos Prometheus*/

const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect('mongodb+srv://politecnico:Poli123@cluster0-jsape.mongodb.net/rigth?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (error) {
            if (error) {
                console.log('Lo siento algo Sucesio, observe el error al tratar de conectar a la base de datos: ');
                console.log(error);
                throw error;
            } else {
                console.log('La conexión a la Base de datos Atlas MongoDb fue exitosa');
            }
        }
    );
}

module.exports = connect();