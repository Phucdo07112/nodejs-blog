const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        let courseQuery = Course.find({});
        if(req.query.hasOwnProperty('_sort')) { // kiểm tra có _sort ko nếu có thì chạy
            courseQuery = courseQuery.sort({ // sắp xếp theo thứ tự column = type
                [req.query.column]: req.query.type
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted({})]) // deletedCount là số khóa học đã xóa, courses là dữ liệu khóa học db
            .then(([courses,deletedCount]) => 
                    res.render('me/stored-courses', 
                    {
                        deletedCount,
                        courses: mutipleMongooseToObject(courses)
                    }
                )
            )
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({}) // lấy ra khóa học đã delete soft
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new MeController();