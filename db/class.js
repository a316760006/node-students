// 引入 mongoose 操作模块
const mongoose = require('mongoose');
const Mongo = require('./db')
let newclass = Mongo({
    className: {
        type: String,
        required: true
    },
    classDate: {
        type: String,
        required: true
    },
    classTeacher: {
        type: String,
        required: true
    },
    classMaster: {
        type: String,
        required: true
    }
});
let NewclassModel = mongoose.model('newclass', newclass);
// 自动创建集合
// let aaa = new NewclassModel({
//     className: '1807A',
//     classDate: '18年7月',
//     classTeacher: '阮野',
//     classMaster: '刘淼'
// })
// aaa.save().then((doc) => {
//     console.log(doc._doc);
// })

// 获取班级列表
exports.allClass = (req, res) => {
    NewclassModel.find().then(doc => {
        if (doc.length == 0)
            res.json([]);
        else {
            res.json(doc);
        }
    })
}
// 创建班级
exports.addClass = (req, res) => {
    NewclassModel.insertMany(req.body).then(doc => {
        if (doc) {
            res.send('添加成功');
        } else {
            res.send('添加失败,服务器错误');
        }
    })
}
// 删除班级
exports.delclass = (req, res) => {
    NewclassModel.deleteOne(req.body).then(result => {
        if (result.ok == 1 && result.n == 1) {
            res.send('删除成功')
        } else if (result.n == 0) {
            res.send('删除失败,没有该条数据')
        }
    }).catch(err => {
        res.send('删除失败,服务器错误')
    })
}
// 按条件查找
exports.queryclass = (req, res) => {
    if (typeof (req.body._id) == 'string') {
        NewclassModel.find(req.body).then(doc => {
            res.json(doc[0]);
        })
    } else {
        NewclassModel.find(req.body._id).then(doc => {
            res.json(doc);
        })
    }
}