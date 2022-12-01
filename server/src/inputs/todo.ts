import {Field, InputType } from "type-graphql";

@InputType("Create")
class CreateElement {

    @Field()
    name: string;
    
    @Field()
    done: string;

    @Field()
    pending: string;
}

@InputType()
class EditElement{
    @Field()
    done: string;

    @Field()
    pending: string;
}

export { CreateElement, EditElement };