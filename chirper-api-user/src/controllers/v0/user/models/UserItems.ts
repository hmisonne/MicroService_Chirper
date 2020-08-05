import {Table, Column, Model} from 'sequelize-typescript';


@Table
export class UserItems extends Model<UserItems> {

  @Column
  public userId!: string;

  @Column
  public name!: string;

  @Column
  public avatarURL?: string;

}