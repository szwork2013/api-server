var express = require('express');
var apiRouter = express.Router();

var goodController = require('../controllers/good.js');
var userController = require('../controllers/user.js');
var orderController = require('../controllers/order.js');
var cartController = require('../controllers/cart.js');
var catController = require('../controllers/cat.js');
var specController = require('../controllers/spec.js');
var storeController = require('../controllers/store.js');
var CmsFragmentController = require('../controllers/cms_fragment.js');
var CmsModuleController = require('../controllers/cms_module.js');

//cats 类别
apiRouter.get('/cats', catController.queryAll)
apiRouter.get('/cats/:cat_id', catController.findOne)
apiRouter.put('/cats/:cat_id', catController.update) //admin
apiRouter.post('/cats', catController.add) //admin
apiRouter.delete('/cats/:cat_id', catController.del) //admin

//specs 种类
apiRouter.get('/specs', specController.queryAll)
apiRouter.get('/specs/:spec_id', specController.findOne)
apiRouter.put('/specs/:spec_id', specController.update) //admin
apiRouter.post('/specs', specController.add) //admin
apiRouter.delete('/specs/:spec_id', specController.del) //admin

//store
apiRouter.get('/stores', storeController.queryAll)
apiRouter.get('/users/:user_id/stores/', storeController.queryAll)
apiRouter.get('/users/:user_id/stores/:store_id', storeController.findOne)
apiRouter.get('/stores/:store_id', storeController.findOne)
apiRouter.put('/stores/:store_id', storeController.update) //admin
apiRouter.post('/stores', storeController.add) //admin
apiRouter.delete('/stores/:store_id', storeController.del) //admin

//goods
apiRouter.get('cats/cat_id/goods', goodController.queryAll);
apiRouter.get('specs/spec_id/goods', goodController.queryAll);
apiRouter.get('suppliers/supplier_id/goods', goodController.queryAll);
apiRouter.get('/goods', goodController.queryAll)

apiRouter.get('/goods/:good_id', goodController.findOne)
apiRouter.put('/goods/:good_id', goodController.update)
apiRouter.post('/goods', goodController.add)
apiRouter.delete('/goods/:good_id', goodController.del)


//cart
apiRouter.get('/carts', cartController.queryAll) //admin
apiRouter.get('/users/:user_id/cart', cartController.findOne)//查询购物车商品详情
apiRouter.put('/users/:user_id/cart', cartController.update) //将商品添加到购物车, 将商品从购物车中移除
apiRouter.delete('/users/:user_id/cart', cartController.del) //清空购物车

//order
apiRouter.get('/users/:user_id/orders', orderController.queryAll)
apiRouter.get('/users/:user_id/orders/:order_id', orderController.findOne)
apiRouter.put('/users/:user_id/orders/:order_id', orderController.update)
apiRouter.post('/users/:user_id/orders', orderController.add)
apiRouter.delete('/users/:user_id/orders/:order_id', orderController.del)

apiRouter.get('/orders', orderController.queryAll)
apiRouter.get('/orders/:order_id', orderController.findOne)
apiRouter.put('/orders/:order_id', orderController.update)
apiRouter.post('/orders', orderController.add)
apiRouter.delete('/orders/:order_id', orderController.del)

//users
apiRouter.get('/users', userController.queryAll)
apiRouter.get('/users/:user_id', userController.findOne)
apiRouter.put('/users/:user_id', userController.update)
apiRouter.post('/users', userController.add)
apiRouter.delete('/users/:user_id', userController.del)

//modules
apiRouter.get('/modules', CmsModuleController.queryAll)
apiRouter.get('/modules/:cms_module_id', CmsModuleController.findOne)
apiRouter.put('/modules/:cms_module_id', CmsModuleController.update)
apiRouter.post('/modules', CmsModuleController.add)
apiRouter.delete('/modules/:cms_module_id', CmsModuleController.del)

//fragments
apiRouter.get('/modules/:cms_module_id/fragments', CmsFragmentController.queryAll)
apiRouter.get('/fragments', CmsFragmentController.queryAll)
apiRouter.get('/fragments/:cms_fragment_id', CmsFragmentController.findOne)
apiRouter.put('/fragments/:cms_fragment_id', CmsFragmentController.update)
apiRouter.post('/fragments', CmsFragmentController.add)
apiRouter.delete('/fragments/:cms_fragment_id', CmsFragmentController.del)

module.exports = apiRouter;