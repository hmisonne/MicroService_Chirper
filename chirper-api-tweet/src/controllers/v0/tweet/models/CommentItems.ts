import {Table, Column, Model, CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {TweetItems} from './TweetItems'

@Table
export class CommentItems extends Model<CommentItems> {
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

  @ForeignKey(() => TweetItems)
  @Column
  tweetId: number;
  
  @BelongsTo(() => TweetItems)
  tweet: TweetItems;
}