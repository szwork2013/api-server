var crypto = require('crypto'),
    models = require('../models');

var User = models.User,
    OAuthAccessToken = models.OAuthAccessToken,
    OAuthRefreshToken = models.OAuthRefreshToken,
    OAuthClient = models.OAuthClient,
    OAuthAuthCode = models.OAuthAuthCode;

var oauth = {

    /**** Always Required ****/
    getAccessToken: function(bearerToken, callback) {
        OAuthAccessToken
            .where({access_token: bearerToken})
            .fetch()
            .then(function(result){
                var token = {
                    id: result.get('id'),
                    userId: result.get('user_id'),
                    clientId: result.get('client_id'),
                    accessToken: result.get('access_token'),
                    expires: new Date(result.get('expires'))
                }
                callback(null, token)
            })
            .catch(function (err) {
                callback(err)
            });
    },

    /**** Always Required ****/
    saveAccessToken: function(token, clientId, expires, userId, callback) {
      var accessToken = {
        client_id: clientId,
        user_id: userId,
        expires: expires
      };

      new OAuthAccessToken({access_token: token})
            .save(accessToken)
            .then(function(result){
                callback(null, result)
            })
            .catch(function (err) {
                callback(err)
            });
    },

    /**** Always Required ****/
    getClient: function(clientId, clientSecret, callback){
        var params = { client_id: clientId };
        if (clientSecret != null) {
            params.client_secret = clientSecret;
        }
        console.log(clientId, clientSecret)
        OAuthClient
            .where(params)
            .fetch()
            .then(function(result){
                callback(null, result)
            })
            .catch(function (err) {
                callback(err)
            });
    },
    /**** Always Required ****/
    grantTypeAllowed: function (clientId, grantType, callback) {
        var authorizedClientIds = ['s6BhdRkqt3', 'app'];
        if (grantType === 'password' || grantType === 'authorization_code') {
            return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
        }
        callback(false, true);
    },

    /****Required for [password] grant type ***/
    getUser: function(username, password, callback) {
      //校验用户名和密码是否正确
      new User({username: username}).fetch({require: true}).then(function(user) {
          var sa = user.get('salt');
          var pw = user.get('password');
          var upw = crypto.createHmac('sha1', sa).update(password).digest('hex');
          if(upw == pw) {
              return callback(null, user.get('id'));
          }
          return callback({'message': 'Invalid password'});
      }, function(error) {
          return callback({'message': 'Unknown user'});
      });

    },

    /****Required for [refresh_token] grant type ***/
    getRefreshToken:  function(refreshToken, callback) {
      OAuthRefreshToken
          .where({refresh_token: refreshToken})
          .fetch()
          .then(function(result){
                var token = {
                    id: result.get('id'),
                    userId: result.get('user_id'),
                    clientId: result.get('client_id'),
                    refreshToken: result.get('refresh_token'),
                    expires: new Date(result.get('expires'))
                }
                callback(null, token)
          })
          .catch(function (err) {
              callback(err)
          });
    },

    /****Required for [refresh_token] grant type ***/
    saveRefreshToken: function(token, clientId, expires, userId, callback) {
      if (userId.id) {
        userId = userId.id;
      }

      var refreshToken = {
        refresh_token: token,
        client_id: clientId,
        user_id: userId,
        expires: expires
      };

      new OAuthRefreshToken()
            .save(refreshToken)
            .then(function(result){
                callback(null, result)
            })
            .catch(function (err) {
                //console.log(err);
                callback(err)
                //callback(null, {})
            });
    },

    /****Required for [authorization_code] grant type ***/
    getAuthCode:  function(authCode, callback) {
        OAuthAuthCode
            .where({ auth_code: authCode })
            .fetch()
            .then(function(result){
                callback(null, {
                    id: result.get('id'),
                    userId: result.get('user_id'),
                    clientId: result.get('client_id'),
                    authCode: result.get('auth_code'),
                    expires: new Date(result.get('expires'))
                })
            })
            .catch(function (err) {
                callback(err)
            });

    },

    /****Required for [authorization_code] grant type ***/
    saveAuthCode: function(code, clientId, expires, userId, callback) {
        var fields = {
            client_id: clientId,
            user_id: userId,
            expires: expires
        };

        new OAuthAuthCode({auth_code: code})
              .save(fields)
              .then(function(result){
                  callback(null, result)
              })
              .catch(function (err) {
                  callback(err)
              });
    }
}

module.exports = oauth;