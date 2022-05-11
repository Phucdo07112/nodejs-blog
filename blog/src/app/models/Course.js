const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator'); // thư viện tự đặt slug
const mongooseDelete = require('mongoose-delete'); // DELETE SOFT

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

// ADD plugins
mongoose.plugin(slug); // cú pháp slug
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Course', Course);
