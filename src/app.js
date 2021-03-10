const express = require('express');
const mongoose = require('mongoose');
const { environment } = require('../environment');
const {productRoute} = require( './products/routes/product')
 class App{
    _app
    constructor(){
      this._app = express()
      this.onInit()
    }
    onInit(){
      try {
        mongoose.connect(environment.mongoString,{
          useNewUrlParser:true,
          useUnifiedTopology:true
        },(error)=>{
          if(error){
            console.log(error)
      
          }
          console.log('mongodb is connected successfully')
        }
        )
      } catch (error) {
        throw error
      }
      this._app.use(express.json())
      this._app.get('/',async(req,res)=>{res.send('<h1>This my app </h1>')})
      this._app.use('/apis/products',productRoute.router)
      const port = process.env.port || 4200;
      
      this._app.listen(port,()=>{
          console.log(`app is running on ${port}`)
      })
    }
}
exports.app = new App()