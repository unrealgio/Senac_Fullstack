const { DataTypes } = require('sequelize') // importando os tipos de dados que o sequelize usa para definir os campos de um modelo

const db = require('../database/conn')

const User = db.define('User', {

    name: {
    type: DataTypes.STRING,
    allowNull: false
    },

    occupation: {
        type: DataTypes.STRING,
        allowNull: false

    },

    date_of_birth:{

        type: DataTypes.DATE,
        required: true

    },

    newsletter:{

        type: DataTypes.BOOLEAN,
    },
})

module.exports = User

