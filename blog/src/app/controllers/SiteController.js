const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /news
    index(req, res, next) {
        
        Course.find({}, function (err, courses) {
            // if(!err) {
            //     res.json(courses);
            // } else {
            //     next(err); // đẩy lỗi tập trung 1 chổ cho middleware sử lí
            // }

            Course.find({})// .lean() giải quyết vấn đề .toObject() do function constructor gây ra (ko nhận được dữ liệu từ mảng)
                .then(courses => {
                    res.render('home', { courses: mutipleMongooseToObject(courses) })
                })
                .catch(err => next(err))

        })
    }

    // [GET] /news/:slug
    show(req, res) {
        console.log(req.query); // hiển thị chức năng search trên URL
        res.render('search');
    }
}

module.exports = new SiteController();
