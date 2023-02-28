const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const app = express();

const books = [
    {id: 1, name:'Book 1', authorId:1},
    {id: 2, name:'Book 2', authorId:1},
    {id: 3, name:'Book 3', authorId:1},
    {id: 4, name:'Book 4', authorId:2},
    {id: 5, name:'Book 5', authorId:3},
    {id: 6, name:'Book 6', authorId:3},
    {id: 7, name:'Book 7', authorId:3}

]
const schema1 = new GraphQLSchema({
    query : new GraphQLObjectType({
        name: 'HelloWorld',
        fields: () => ({
            message: {
            type: GraphQLString,
            resolve: ()=> 'Hello World'
            }
        })
    })
});

 const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents book by an author ',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name :{type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLInt)},
        author:{
            type : AuthorType,
            resolve :(book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})
const RootQueryType = new GraphQLObjectType({
        name: 'Query',
        description: 'Root Query',
        fields: () => ({
            books:{
                type: new GraphQLList(BookType) ,
                desc: "List of all book",
                resolve: () => books
            }
            })
    })

const schema = new GraphQLSchema({
    query : RootQueryType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:true
}))

app.listen(5000. ,()=>{
    console.log("Server running")
})