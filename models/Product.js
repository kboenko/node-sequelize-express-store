module.exports = (sequelize, DataTypes) => {

    let Product = sequelize.define("product", {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.INTEGER
    }, {
        freezeTableName: true
    });

    return Product;

};