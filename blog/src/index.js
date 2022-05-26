const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

// Connect to db
db.connect();

const app = express();
const port = 3000;

// TỪ KHÓA .use là bao hàm tất cả req của chúng ta

app.use(express.static(path.join(__dirname, 'public'))); // kiểm tra có phải file tĩnh hay không nếu đúng điều hướng dang file public

app.use(
    express.urlencoded({ // cấu trúc lại dữ liệu code và lưu lại vào object body khi submit lên
        extended: true,
    }),
); // đây là middleware để sử lý dữ liệu từ form submit lên cho chúng ta, urlencoded sử lý dạng form
app.use(express.json()); // dạng gửi từ code js lên thì có ex.json sử lý

// XMLHttpRequest, fetch, axios, gửi phương thức post get đều được và có thể gửi lên phía server cho ta chứ ko phải gửi dạng form
// use sử dụng

// HTTP logger
app.use(morgan('combined'));

// override with POST having ?_method=DELETE : ghi đè bằng POST có? _method = DELETE
app.use(methodOverride('_method')) // đứng giữa xem có getparameter truyên lên là _method không nếu có thì làm đoạn code override: điều hướng lại router của nó

app.use(bacBaoVe); // nếu có đường đẫn ở trước thì chỉ áp dụng cho đường dẫn đó còn không thì áp dụng toàn bộ ứng đụng
function bacBaoVe( req, res, next) {
    if(['vevip','vethuong'].includes(req.query.ve)) {
        req.face = 'dung roi con trai' // chỉnh sửa middleware
        return next();
    }
    res.status(403).json({
        message: 'co cai nit',
    })
}
// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: function (a, b) { return a + b}
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init: khởi tạo tuyến đường
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// { Query parameters là khái niệm để giúp mình có thể truyền được dữ liệu qua chính URL của mình
// nó tồn tại trong tất cả các METHOD sử dụng = ?value=...&value&...
// thường được sử dụng với GET method }

// GET method nhận dữ liệu từ phía server, từ phía client (gửi yêu cầu lấy dữ liệu)
// POST method phi muốn gửi dữ liệu từ phía client lên trên phía server (người dùng lên máy chủ) (gửi yêu cầu thêm dữ liệu)
