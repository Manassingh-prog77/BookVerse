const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

// Define the AuthorType
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        booksWritten: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // Fetch books by authorId
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

// Define the BookType
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // Fetch author by authorId from parent
                return Author.findById(parent.authorId);
            }
        }
    })
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Fetch book by id
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Fetch author by id
                return Author.findById(args.id);
            }
        },
        allBooks: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // Fetch all books
                return Book.find({});
            }
        },
        allAuthors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // Fetch all authors
                return Author.find({});
            }
        }
    }
});

// Define the Mutations
const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                // Create and save a new author
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
               
                // Create and save a new book with authorId
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId // Ensure authorId is set
                });
                const savedBook = await book.save();
                return savedBook;
            }
        }
    }
});

// Export the GraphQL schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});
