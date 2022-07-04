module.exports = function SortMiddleware(req, res, next) {

    res.locals._sort = { // locals giúp bạn có thể truy cập _sort ở view để lấy dữ liệu
        enabled: false, // mặc định là tắt
        type: 'default' // mặc định
    };

    if(req.query.hasOwnProperty('_sort')) { // nếu param có _sort thì chạy
        // res.locals._sort.enabled = true; //gán lại giá trị enabled thành true
        // res.locals._sort.type = req.query.type; // gán lại giá trị bằng với type trong params
        // res.locals._sort.columns = req.query.columns; // gán lại giá trị bằng với type trong params

        Object.assign(res.locals._sort, {
            enabled : true, //gán lại giá trị enabled thành true
            type : req.query.type, // gán lại giá trị bằng với type trong params
            column : req.query.column, // gán lại giá trị bằng với type trong params
        })
    }

    next();
}