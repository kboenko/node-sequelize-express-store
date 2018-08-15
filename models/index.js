const fs        = require("fs");
const path      = require("path");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const CONFIG = require('../config/config');

let sequelize = new Sequelize(CONFIG.DB.name, CONFIG.DB.user, CONFIG.DB.password, {
    host: CONFIG.DB.host,
    dialect: CONFIG.DB.dialect,
    dialectOptions: {
        ssl: true
    },
    define: {
        timestamps: false,
    },
    operatorsAliases: Op,
    freezeTableName: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

sequelize.sync();


var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;