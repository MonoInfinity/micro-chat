import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ default: '' })
    googleId: string;

    @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
    createDate: Date;

    @Column({ default: false })
    isDisabled: boolean;

    @Column({ default: '' })
    email: string;

    @Column({ default: '' })
    avatarUrl: string;
}

export default User;
