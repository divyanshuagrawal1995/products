const mongoose  = require('mongoose') ;
class Product{
    _model
    productSchema
 constructor(){
    this.productSchema = new mongoose.Schema({
        categories:{
            type:Array
        },
        tag_id:{
            type:Number
        },
        Name:{
            type:String
        },
        description:{
            type:String
        },
        price:{
            type:Object
        },
        coverImage:{
            type:String
        },
        images:{
            type:Array
        },
        slug:{
            type:String
        },
        addedAt:{
            type:Number,
            default:new Date().getTime()
        }
    },{strict:false})
    this._model = new mongoose.model('products',this.productSchema)
 }

}
exports.productModel = new Product()