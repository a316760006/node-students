// 引入 mongoose 操作模块
const mongoose = require('mongoose');
const Mongo = require('./db')
const jwt = require('jsonwebtoken')
// jwt 加密的时候混淆
const secret = 'alskdhjnli';
let admin = Mongo({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    level: {
        type: String,
        require: true
    },
    roles: {
        type: Array,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    code: {
        type: Number,
        require: true
    },
});
let adminModel = mongoose.model('admin', admin);
// 登录账号
exports.adminLogin = (req, res) => {
    adminModel.find(req.body).then(doc => {
        if (doc.length == 0)
            res.json({ code: 50008 });
        else {
            const token = jwt.sign({
                _id: doc[0]._id
            }, secret, {
                //秒到期时间 60 秒后到期
                expiresIn: '1h'
            })
            res.json({
                code: 20000,
                token
            });
            // res.json(doc[0])
        }
    })
}
// 获取用户信息
exports.adminToken = (req, res) => {
    //解密token
    jwt.verify(req.query.token, secret, function (err, decoded) {
        if (!err) {
            adminModel.find({ _id: decoded._id }).then(doc => {
                if (doc.length == 0)
                    res.json([]);
                else {
                    res.json({
                        avatar: doc[0].avatar,
                        code: 20000,
                        level: doc[0].level,
                        roles: doc[0].roles
                    });
                }
            })
        } else {
            res.json({
                code: 50014,
                message: '登录已过期,请重新登录'
            });
        }
    })
}
// 添加用户
exports.addAdmin = (req, res) => {
    adminModel.find({ username: req.body.username }).then(doc => {
        if (doc.length == 0) {
            req.body.avatar = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1461891934,371165531&fm=26&gp=0.jpg'
            adminModel.insertMany(req.body).then(doc => {
                if (doc) {
                    res.send('添加成功')
                }
            })
        } else {
            res.send('账号已存在');
        }
    })
}