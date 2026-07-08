import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn ,ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class File {
    
    @PrimaryGeneratedColumn()
    id: number;

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
    
    @CreateDateColumn({ type: 'timestamp' })
    uploadedAt: Date;

    @ManyToOne(() => User, (user) => user.files, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
