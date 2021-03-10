const express = require('express');
const {productController} = require('../controllers/product') ;
class Product{
router = express.Router()
constructor(){
    this.onInit()
}
onInit(){
    this.router.get('/list-categories',productController.listCategories)
    this.router.post('/add-category',productController.addCategory)
    this.router.post('/add-product',productController.addProduct)
    this.router.post('/list-products',productController.listProducts)
    this.router.post('/getproduct',productController.productDetails)

}
}
exports.productRoute = new Product()