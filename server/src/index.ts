import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import resolvers from "./resolvers/todo";
import entities from "./entities/index";
import "reflect-metadata";

dotenv.config();

const main= async() => {
    const schema= await buildSchema({
        resolvers
    })
    const server= new ApolloServer({
        schema,
        cors: {
            credentials: true,
            origin:["https://studio.apollographql.com", "http://localhost:4000", "http://localhost:3000"]
        }
    });

    server.listen(4000, ()=> {
        console.log("server listening to port 4000");
    })
};

createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    entities,
    logging: false,
})
.then(()=> {
    console.log("connected to the database");
    main();
})
.catch((err)=> {
    console.log(err);
})