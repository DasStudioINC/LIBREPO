import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [member, setMember] = useState(null);
  const [memberId, setID] = useState(-1);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [local, isLocal] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoad(true);
      try {
        // Option A: Use 'let' so you can reassign it
        // let baseUrl = local ? "http://localhost:8080/api/v1/members" : "http://192.168.2.39:8080/api/v1/members";

        // Option B: A cleaner way using a const and ternary operator
        const host = local
          ? "http://localhost:8080"
          : "http://192.168.2.39:8080";
        const url =
          memberId === -1
            ? `${host}/api/v1/members`
            : `${host}/api/v1/members/${memberId}`;

        const response = await fetch(url);

        if (!response.ok) throw new Error("failed to fetch");

        const data = await response.json();
        setMember(data);
      } catch (err) {
        console.error("error something:", err);
        setError(err.message);
      } finally {
        setLoad(false);
      }
    }

    fetchData();
  }, [memberId, local]); // Added 'local' here so it re-fetches if the toggle changes!

  if (load) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {memberId === -1 ? (
        <h1>
          Total members found: {Array.isArray(member) ? member.length : 0}
        </h1>
      ) : (
        <h1>Current user: {member?.name?.firstName}</h1>
      )}
    </div>
  );
}

export default App;
