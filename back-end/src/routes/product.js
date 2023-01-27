const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct,getProductsBySlug,deleteProductById, getProductDetailsById ,getProducts} = require('../controller/product');
//const { addCategory, getCategories } = require('../controller/category');
const router = express.Router();
const multer =require('multer');
const shortid =require('shortid');
const path =require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate()+'-'+file.originalname)
    }
})

const upload =multer({storage});

router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPicture'),createProduct);
router.get('/products/:slug',getProductsBySlug);
router.get('/product/:productId',getProductDetailsById);
router.delete(
  "/product/deleteProductById",
  requireSignin,
  adminMiddleware,
  deleteProductById
);
router.post(
  "/product/getProducts",
  requireSignin,
  adminMiddleware,
  getProducts
);

module.exports =router;