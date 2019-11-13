// 引入 mongoose 操作模块
const mongoose = require('mongoose');
const Mongo = require('./db')
let admin = Mongo({
    adminname: {
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
// 获取账号
exports.adminLogin = (req, res) => {
    adminModel.find(req.body).then(doc => {
        if (doc.length == 0)
            res.json([]);
        else {
            res.json(doc[0]);
        }
    })
}
// 获取用户信息
exports.adminToken = (req, res) => {
    adminModel.find(req.query).then(doc => {
        if (doc.length == 0)
            res.json([]);
        else {
            res.json(doc[0]);
        }
    })
}
// 添加用户
exports.addAdmin = (req, res) => {
    console.log(req.body)
    // adminModel.insertMany(req.body).then(doc => {
    //     // res.send('ok')
    //     console.log(doc)
    // })
}