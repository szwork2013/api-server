var Address = require('../models/address.js');
var Cat = require('../models/cat.js');
var Spec = require('../models/spec.js');
var Tag = require('../models/tag.js');
var Cart = require('../models/cart.js');
var Coupon = require('../models/coupon.js');
var Good = require('../models/good.js');
var Order = require('../models/order.js');
var User = require('../models/user.js');
var OrderDetail = require('../models/order_detail.js');
var Store = require('../models/store.js');
var Tag = require('../models/tag.js');
var GoodTag = require('../models/good_tag.js');
var CmsFragment = require('../models/cms_fragment.js');
var CmsModule = require('../models/cms_module.js');


//oauth2 models
var Bookshelf = require('bookshelf').mysqlAuth;
OAuthRefreshToken = Bookshelf.model('OAuthRefreshToken', Bookshelf.Model.extend({
    tableName: 'oauth_refresh_tokens'
}));
OAuthAccessToken = Bookshelf.model('OAuthAccessToken', Bookshelf.Model.extend({
    tableName: 'oauth_access_tokens'
}));
OAuthClient = Bookshelf.model('OAuthClient', Bookshelf.Model.extend({
    tableName: 'oauth_clients'
}));
OAuthAuthCode = Bookshelf.model('OAuthCode', Bookshelf.Model.extend({
    tableName: 'oauth_auth_codes'
}));


module.exports = {
	Address: Address,
	Cat: Cat,
	Cart: Cart,
	Coupon: Coupon,
	Good: Good,
	Order: Order,
	User: User,
	OrderDetail: OrderDetail,
	Spec: Spec,
	Store: Store,
	Tag: Tag,
	GoodTag: GoodTag,
	CmsFragment: CmsFragment,
	CmsModule: CmsModule,

	//oauth models
	OAuthAccessToken: OAuthAccessToken,
	OAuthRefreshToken: OAuthRefreshToken,
	OAuthClient: OAuthClient,
	OAuthAuthCode: OAuthAuthCode
}