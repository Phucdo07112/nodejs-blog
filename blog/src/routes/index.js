const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me')

function route(app) {
    // request nó chứa thông tin yêu cầu gửi lên
    // response nó chứa lựa chọn tùy chỉnh qua response , phản hồi ngược lại cho client

    app.use('/news', newsRouter);
    app.use('/me', meRouter)
    app.use('/courses', coursesRouter)
    app.use('/', siteRouter);
    // app.post('/search', (req, res) => {
    //     console.log(req.body); // qs / body-parser thư viện có sẳn
    //     res.send('');
    // })
}

module.exports = route;
