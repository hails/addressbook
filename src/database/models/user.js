const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }

  const beforeCreate = async (user) => {
    const saltRounds = 15
    const hash = await bcrypt.hash(user.password, saltRounds)

    user.set('password', hash)
  }

  const User = sequelize.define(
    'User',
    schema,
    {
      underscored: true,
      hooks: {
        beforeCreate,
      },
    }
  )

  return User
}
