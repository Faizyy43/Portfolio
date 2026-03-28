import { useEffect, useState } from "react";
import api from "../api/api.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => {
        console.log(res.data); // DEBUG
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {projects.map((p) => (
        <div key={p._id} className="bg-gray-900 text-white p-4 rounded">
          <h2 className="text-xl">{p.title}</h2>
          <p className="text-gray-400">{p.description}</p>
          <a href={p.github} className="text-blue-400">
            GitHub
          </a>
        </div>
      ))}
    </div>
  );
}
