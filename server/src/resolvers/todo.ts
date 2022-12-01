import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Todo from "../entities/todo";
import { CreateElement, EditElement } from "../inputs/todo";

@Resolver()
class TodoResolver {

    @Mutation(()=> Todo)    
    async addElements(@Arg("createElement") createElement: CreateElement) {
        try {
            const element= new Todo();
            element.name= createElement.name;
            element.done= createElement.done;
            element.pending= createElement.pending;
            const todoCreated= await element.save();
            return todoCreated;
        }
        catch(error){
            throw new Error(`Error-->${error}`);
        }
    }

    @Mutation(()=>Todo)
    async editElements(@Arg("editElement") editElement: EditElement, @Arg("Id") id: string){
        try {
            const todo= await Todo.findOne({where: {id: id}});
            if (!todo) {
                throw new Error("Invalid Id");
            }
            if (editElement.done && editElement.pending) {
                todo.done= editElement.done;
                todo.pending= editElement.pending;
            }
            const todoUpdated= await todo.save();
            return todoUpdated;
        }
        catch(error){
            throw new Error(`error--->${error}`);
        }
    }

    @Mutation(()=> Todo)
    async deleteElements(@Arg("Id") id: string){
        try {
            const todo= await Todo.findOne({where: {id: id}});
            if (!todo){
                throw new Error("invalid id");
            }
            const deleteElement= await todo.remove();
            return deleteElement;
        }
        catch(error){
            console.log(`error--->${error}`);
        }
    }

    @Query(()=> [Todo])
    async getElements(){
        try{
            const todos= await Todo.find();
            return todos;
        }
        catch(error){
            console.log(`error---->${error}`);
        }
    }

    @Query(()=> Todo)
    async findElement(@Arg("Id") id: string){
        try {
            const foundTodo= await Todo.findOne({where: {id: id}});
            if (!foundTodo){
                throw new Error("invalid id");
            }
            return foundTodo;
        }
        catch(error){
            console.log(`error--->${error}`);
        }
    }
}

export default [TodoResolver] as const;