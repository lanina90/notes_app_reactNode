import sequelize from '../db.js';
import {DataTypes} from "sequelize";

export const Note = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: {type: DataTypes.STRING, allowNull: false},
  Created: {type: DataTypes.DATE, allowNull: false},
  Category: {type: DataTypes.STRING},
  Content: {type: DataTypes.STRING},
  Dates: {type: DataTypes.STRING},
  Archived: {type: DataTypes.BOOLEAN,  defaultValue: 'false'}
} )

