// src/pages/ProjectsPage.js
import React, { useState } from 'react';

function ProjectsPage() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project A', availableSpots: 5 },
    { id: 2, name: 'Project B', availableSpots: 3 },
    { id: 3, name: 'Project C', availableSpots: 0 },
    { id: 4, name: 'Project D', availableSpots: 2 },
  ]);
  
  const [message, setMessage] = useState(""); // New state for message

  const handleSignUp = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, availableSpots: project.availableSpots - 1 }
          : project
      )
    );
    setMessage("You have successfully signed up for this project!"); // Set confirmation message
  };

  return (
    <div>
      <h2>Available Projects</h2>
      {message && <p>{message}</p>} {/* Display confirmation message */}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>Available Spots: {project.availableSpots}</p>
            <button
              onClick={() => handleSignUp(project.id)}
              disabled={project.availableSpots === 0}
            >
              {project.availableSpots > 0 ? 'Sign Up' : 'No Spots Available'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;
