import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Todo")
@ObjectType("Todo")
class Todo extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    @Field()
    id: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    done: string;

    @Column()
    @Field()
    pending: string;

    @CreateDateColumn()
    @Field()
    date: string;
}

export default Todo;