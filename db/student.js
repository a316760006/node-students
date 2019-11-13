// 引入 mongoose 操作模块
const mongoose = require('mongoose');
const Mongo = require('./db')
// 创建构造函数
let Student = Mongo({
    date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    result: {
        type: Number,
        required: true
    },
    fail: {
        type: Number,
        required: true
    }
});
let StudentModel = mongoose.model('student', Student);
// 查找所有学生
exports.findStudents = (req, res) => {
    StudentModel.find().then(doc => {
        if (doc.length == 0)
            res.json([]);
        else {
            res.json(doc);
        }
    })
}
// 添加学生
exports.addStudent = (req, res) => {
    // console.log(req.body)
    StudentModel.insertMany(req.body).then(doc => {
        if (doc) {
            res.send('添加成功');
        } else {
            res.send('添加失败,服务器错误');
        }
    })
}
// 删除学生
exports.delStudent = (req, res) => {
    StudentModel.deleteOne(req.body).then(result => {
        if (result.ok == 1 && result.n == 1) {
            res.send('删除成功')
        } else if (result.n == 0) {
            res.send('删除失败,没有该条数据')
        }
    }).catch(err => {
        res.send('删除失败,服务器错误')
    })
}
// 按条件查找学生
exports.queryStudent = (req, res) => {
    if (typeof (req.body._id) == 'string') {
        StudentModel.find(req.body).then(doc => {
            res.json(doc[0]);
        })
    } else {
        StudentModel.find(req.body._id).then(doc => {
            res.json(doc);
        })
    }
}
// 修改学生
exports.modifystudent = (req, res) => {
    const where = { _id: req.body._id }
    StudentModel.updateOne(where, { $set: req.body.stuval }).then(result => {
        if (result) {
            res.send('ok');
        } else {
            res.send('修改失败,请检查您输入的信息')
        }
    })
}