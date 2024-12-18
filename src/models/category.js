"use strict"

const {mongoose} = require("../configs/dbConnection")

const CategorySchema = new mongoose.Schema({}, {
    collection: "categories",
    timestamps: true
})