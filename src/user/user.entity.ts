import { File } from "src/file/file.entity";
import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";

@Entity()

export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()

    email:string;

    @Column()
    role:string

    @Column()
    password:string;

    @Column()
    createdAt:Date;

    @OneToMany(() => File, (file) => file.user)
    files: File[];
    
}