const mongoose = require('mongoose')
const dbURL = `mongodb+srv://paulesthappan:${process.env.MongoPsw}@clustertest.pcppuht.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTEST`

mongoose.connect(dbURL).then(() => {
    console.log('Database Connected');
}).catch((error) => {
    console.log("error occured",error)
})
