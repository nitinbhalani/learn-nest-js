import { Profile } from 'src/profile/profile.entity';
import { Tweet } from 'src/tweet/tweet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 24,
    unique: true,
    nullable: false,
  })
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ['insert'],
  })
  profile: Profile;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
