'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { // 2. Users 모델에게 1:1 관계 설정을 합니다.
        targetKey: 'user_id', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'User_id', // 4. UserInfos 모델의 UserId 컬럼과 연결합니다.
      });
    }
  }
  Profiles.init({
    profile_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    User_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'Users',
        key:'user_id',
      },
      onDelete: 'CASCADE',
    },
    introduce: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Profiles',
  });
  return Profiles;
};