import logo from "./logo.svg";
import "./App.css";
// Import everything needed to use the `useQuery` hook
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_TODO = gql`
  query GetTodos {
    getTodos {
      id
      title
      completed
      user {
        name
        email
        phone
      }
    }
  }
`;

function DisplayTasks() {
  const { loading, error, data } = useQuery(GET_TODO);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return data.getTodos.map(({ id, title, completed, user }) => (
    <div key={id}>
      <div className="card">
        <input type="checkbox" checked={completed} /> {title}
        <div>
          {user.name} | {user.email}
        </div>
      </div>

      <br />
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <div>
        <h2>My first Apollo app 🚀</h2>
      </div>
      <br></br>
      <DisplayTasks></DisplayTasks>
    </div>
  );
}

export default App;
