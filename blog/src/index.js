const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

// Connect to db
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
); // đây là middleware để sử lý dữ liệu từ form submit lên cho chúng ta, urlencoded sử lý dạng form
app.use(express.json()); // dạng gửi từ code js lên thì có ex.json sử lý

// XMLHttpRequest, fetch, axios, gửi phương thức post get đều được và có thể gửi lên phía server cho ta chứ ko phải gửi dạng form
// use sử dụng

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
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
