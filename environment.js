const mongoose = require('mongoose')
class Environment{
   generateMongoId(id){
       return mongoose.Types.ObjectId(id)
   }
   mongoString = 'mongodb+srv://zed:zed123@cluster0-j7uuv.mongodb.net/zed?retryWrites=true&w=majority'
}
exports.environment = new Environment()