
import {DataTypes, Model} from 'sequelize';
import sequelize from "../db";

class UserNote extends Model {}

UserNote.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dates: {
    type: DataTypes.STRING,
    allowNull: true
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: "UserNote",
  tableName: "user_notes",
  timestamps: false,
});

export default UserNote;






