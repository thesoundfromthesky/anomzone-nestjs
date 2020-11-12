import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
} from 'typeorm';

import { Exclude, Expose, Transform } from 'class-transformer';
import * as argon2 from 'argon2';
import { UnauthorizedException } from '@nestjs/common';
import { ValidationGroup } from '@config/index';
import { convertToIp4 } from '@middleware/index';

export abstract class Metadata {
  @PrimaryGeneratedColumn()
  id!: number;

  // Hash Length for Argon2 95
  // Hash length for bcryptjs 60
  @Exclude()
  @Column({ type: 'char', length: 95 })
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Expose({ groups: [ValidationGroup.Delete] })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;

  @Transform((ip: string) => convertToIp4(ip))
  @Column({ type: 'inet' })
  ip!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @BeforeUpdate()
  async deletePassword() {
    this.password = undefined as never;
  }

  async authenticate(password: string) {
    const authenticate = await argon2.verify(this.password, password);
    if (!authenticate) {
      throw new UnauthorizedException();
    }
    return authenticate;
  }
}
