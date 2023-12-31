import { DataTypes, Model } from "sequelize";
import { SequelizeConnection } from "../infrastructure/database/SequelizeConnection";
import post from "./post";
export interface UserAttributes {
  userID: number;
  username: string;
  password: string;
  biography: string;
  profilePicture: Buffer | string;
}

export interface UserLoginAttributes {
  username: string;
  password: string;
}

  class User extends Model<UserAttributes> implements UserAttributes {
    declare userID: number;
    declare username: string;
    declare password: string;
    declare biography: string;
    declare profilePicture: Buffer | string;

  }

  User.init({
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: true
    },
    biography: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.BLOB,
      allowNull: true
    }
    }, {
      freezeTableName: true,
      sequelize: SequelizeConnection.getInstance(),
      timestamps: false
    });

    // console.log(User === sequelize.models.User);

    User.hasMany(post, { foreignKey: 'userID' });
    export default User;