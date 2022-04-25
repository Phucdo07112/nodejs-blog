const Course = require('../models/Course')
class NewsController {
    // [GET] /news
    index(req, res) {
        
        Course.find({}, function (err, courses) {
            if(!err) {
                res.json(courses);
                return
            }
            res.status(400).json({ error: 'error'})
        })
        // res.render('home');
    }

    // [GET] /news/:slug
    show(req, res) {
        console.log(req.query.q);
        res.render('search');
    }
}

module.exports = new NewsController();
