import './App.css';
import BookList from './components/BookList';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <div className="main">
    <h1>Ninja Reading List</h1>
    <BookList />
    <AddBook />
    </div>
    </ApolloProvider>
    </>
  );
}

export default App;
