const { environment } = require('../../../environment')
const { categoryModel } = require('../models/category')
const { productModel } = require('../models/product')
class Product {
    async listCategories(req, res) {
        let filter = {}
        if (req.query.parent) filter = { parent: environment.generateMongoId(eq.query.parent) }
        let categories = await categoryModel._model.find(filter).lean()
        try {
            return res.status(200).json({ message: 'category list fetched successfully', categories: categories })
        } catch (error) {
            return res.status(503).json({ message: 'something went wrong' })
        }
    }
    async addCategory(req, res) {
        let category;
        try {
            let categorySchema = new categoryModel._model(req.body)
            category = await categorySchema.save()
            return res.status(200).json({ message: 'category added successfully', category: category })
        } catch (error) {
            return res.status(503).json({ message: 'something went wrong' })

        }
    }
    async addProduct(req, res) {
        let product
        let productSchema;
        let tagCounter;
        try {
            tagCounter = await productModel._model.countDocuments({})
            if (req.body.categories?.length) req.body.categories = req.body.categories.map(id => environment.generateMongoId(id))
            req.body['tag_id'] = tagCounter + 1;
            req.body['slug'] = req.body.name.toLowerCase()
            if (req.body.id) {
                product = await productModel._model.findOne({ '_id': req.body.id }).select('-addedAt').lean()
                if (!product) return res.status(400).json({ message: 'Incorrect Information' })
                for (let key in product) {
                    if(['_id','__v','addedAt'].includes(key)) continue;
                    product[key] = req.body[key]
                }
                product['updatedAt'] = new Date().getTime()
                await productModel._model.updateOne({ '_id': product._id }, { '$set': product })
            }
            else productSchema = new productModel._model(req.body), product = await productSchema.save()
            return res.status(200).json({ message: 'product added successfully', product: product })
        } catch (error) {
            console.log("🚀 ~ file: product.js ~ line 70 ~ Product ~ addProduct ~ error", error)
            return res.status(503).json({ message: 'something went wrong' })

        }
    }
    async listProducts(req, res) {
        let products;
        let categories = req.body.categories;
        let counter = req.body.counter ? req.body.counter : 0;
        let filter;
        try {
            filter = [{ '$project': { 'tag_id': 1, 'name': 1, 'description': 1, 'slug': 1 } }, { '$skip': counter }, { '$limit': 25 }, { '$sort': { '_id': -1 } }]
            if (categories?.length) categories = categories.map(category => environment.generateMongoId(category)), filter.unshift({ '$match': { 'categories': { '$in': categories } } })
            products = await productModel._model.aggregate(filter)
            return res.status(200).json({ message: 'product fetched successfully', products: products })
        } catch (error) {
            return res.status(503).json({ message: 'something went wrong' })
        }
    }
    async productDetails(req, res) {
        let productDetails;
        let slug = req.body.slug
        try {
            productDetails = await productModel._model.findOne({ slug }).select('tag_id name description images price categories').lean()
            if (!productDetails) {
                return res.status(400).json({ message: 'Incorrect Information provided' })
            }
            productDetails['categories'] = await categoryModel._model.find({ '_id': { '$in': productDetails['categories'] } }).select('category').sort({ '_id': 1 })
            return res.status(200).json({ message: 'product details fetched successfully', productDetails: productDetails })
        } catch (error) {
            console.log("🚀 ~ file: product.js ~ line 67 ~ Product ~ productDetails ~ error", error)
            return res.status(503).json({ message: 'something went wrong' })
        }
    }
}
exports.productController = new Product()