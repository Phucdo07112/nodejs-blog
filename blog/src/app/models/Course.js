const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator'); // thư viện tự đặt slug

mongoose.plugin(slug); // cú pháp slug

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String, maxlength: 255, required: true},
    description: {type: String},
    image: {type: String, maxlength: 255},
    slug: {type: String, maxlength: 255},
    videoId: {type: String, maxlength: 255, required: true},
    level: {type: String, maxlength: 255},
    slug: { type: String, slug: 'name', unique: true }// unique: chỉ tồn tại duy nhất 1 cái
    // createdAt: {type: Date, default: Date.now},
    // updateAt: {type: Date, default: Date.now},
}, {
    timestamps: true, // Bằng dòng 16,17
});

module.exports = mongoose.model('Course', Course);
