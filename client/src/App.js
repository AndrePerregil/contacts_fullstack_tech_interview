import React, { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  return (
    <div>
      <h1>Hello {user.name}</h1>
    </div>
  );
}

export default App;
