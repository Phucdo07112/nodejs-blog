class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('home');
    }

    // [GET] /news/:slug
    show(req, res) {
        console.log(req.query.q);
        res.render('search');
    }
}

module.exports = new NewsController();
