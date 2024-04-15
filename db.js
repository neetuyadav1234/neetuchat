const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/vip_pro2';


module.exports.dbConnection = async () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log('db is connected')
    }).catch((error) => {
        console.log('db is not connected', error)
    })
};