import { useEffect, useState } from "react";
import "./UseEffect.css";

export function UseEffect() {
  const [users, setUsers] = useState([]) as any;

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const usersData = await response.json();
        setUsers(usersData.users);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  return (
    <div className="container">
      {users.map((user: any) => {
        return (
          <div key={user.id} className="card">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <p>Age : {user.age}</p>
            <p>UserName : {user.username}</p>
            <p>Email : {user.email}</p>
            <p>Phone : {user.phone}</p>
          </div>
        );
      })}
    </div>
  );
}
