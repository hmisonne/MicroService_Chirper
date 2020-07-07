import {Table, Column, Model, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import { CommentItems } from './CommentItems'

@Table
export class TweetItems extends Model<TweetItems> {
  @Column
  public text!: string;

  @Column
  public author!: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();

  @HasMany(() => CommentItems)
  comments: CommentItems[];

}