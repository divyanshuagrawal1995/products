const mongoose = require('mongoose');
class Category{
    _model
    categorySchema
 constructor(){
    this.categorySchema = new mongoose.Schema({
        category:{
            type:String
        },
        parent:{
            type:mongoose.Types.ObjectId
        },
        addedAt:{
            type:Number,
            default:new Date().getTime()
        }
    })
    this._model = new mongoose.model('category',this.categorySchema)
 }

}
exports.categoryModel = new Category()
