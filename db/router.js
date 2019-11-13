// 路由模块
const express = require('express');
// 引入管理学生集合的文件
const student = require('./student');
// 引入管理班级集合的模块
const newclass = require('./class');
// 引入账号管理模块
const admin = require('./admin');
// 引入路由
let router = express.Router();

router
    // 获取学生列表
    .get('/allstudent', (req, res) => { student.findStudents(req, res) })
    // 添加学生
    .post('/addstudent', (req, res) => { student.addStudent(req, res) })
    // 删除学生
    .post('/delstudent', (req, res) => { student.delStudent(req, res) })
    // 按条件查找
    .post('/querystudent', (req, res) => { student.queryStudent(req, res) })
    // 修改学生信息
    .post('/modifystudent', (req, res) => { student.modifystudent(req, res) })
    // 获取班级列表
    .post('/allnewclass', (req, res) => { newclass.allClass(req, res) })
    // 添加班级
    .post('/addclass', (req, res) => { newclass.addClass(req, res) })
    // 删除班级
    .post('/delclass', (req, res) => { newclass.delclass(req, res) })
    // 按条件查找
    .post('/queryclass', (req, res) => { newclass.queryclass(req, res) })
    // 登录
    .post('/adminlogin', (req, res) => { admin.adminLogin(req, res) })
    // 获取用户信息
    .get('/admintoken', (req, res) => { admin.adminToken(req, res) })
    // 添加用户
    .get('/addadmin', (req, res) => { admin.addAdmin(req, res) })
module.exports = router