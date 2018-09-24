const { ApolloServer,gql} = require('apollo-server');
const fetch = require('node-fetch')

const typeDefs = gql `
  
  type searchResult {
    term: String
    results: [result]
  }

  type result {
      uri: String
      label: String
      types: [typesOf]
      matches: [match]  
  }

  type typesOf {
      uri: String
  }

 type match {
     propertyUri: String
     string: String
 }

  type Query {
      search(text: String): searchResult!
  }
`;

const baseURL =`http://localhost:5820/annex/appmon_new/search`

const resolvers = {
    Query: {
        search: (parent,args) => 
        {
            const { text } = args
            return fetch(`${baseURL}/${text}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46YWRtaW4="
                }}).then(res => res.json())
        }
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({
    url
}) => {
    console.log(`🚀  Server ready at ${url}`);
});
