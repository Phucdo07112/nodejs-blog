const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {

        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) })
            })
            .catch(next);
            
    }
    
    // [GET] /courses/create
    create(req, res, next) {

        res.render('courses/create')

    }
    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://files.fullstack.edu.vn/f8-prod/courses/5.png`;
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => {
                
            })


    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)

    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body) // liên quan đến mongosee để update.
            .then(() => res.redirect('/me/stored/courses')) // Truyền cho response headers một cái location, khi headers có location sẽ tự động chuyển hướng trang
            .catch(next)
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back')) // quay lại trang cũ
            .catch(next);
    }
}

// GET: gửi yêu cầu lên server trả lại dữ liệu cho client
// POST: gửi yêu cầu lên server lưu lại dữ liệu, tạo mới dữ liệu
// PUT & PATCH: chỉnh sử dữ liệu (put sửa lại hết, patch sửa từng cái)
// DELETE: xóa

module.exports = new CourseController();