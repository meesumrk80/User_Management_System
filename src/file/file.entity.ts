import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class File {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    filename: string;

    @Column()
    originalName: string;

    @Column()
    mimeType: string;

    @Column()
    size: number;

    @Column()
    path: string;

    @Column()
    userId: number;

    
    @CreateDateColumn({ type: 'timestamp' })
    uploadedAt: Date;
}
