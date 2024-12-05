import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProjectsPage() {
  const [signedUpProjects, setSignedUpProjects] = useState([]);

  // Handle signing up for a project
  const handleSignUp = (project) => {
    if (signedUpProjects.includes(project)) {
      alert(`You are already signed up for Project ${project}`);
      return;
    }
    setSignedUpProjects([...signedUpProjects, project]);
    alert(`You signed up for Project ${project}`);
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#333', padding: '10px', color: '#fff' }}>
        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', padding: 0 }}>
          <li><Link to="/" style={{ color: '#fff' }}>Sign Out</Link></li>
          <li><Link to="/projects" style={{ color: '#fff' }}>Projects</Link></li>
        </ul>
      </nav>

      {/* Projects Page Content */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Projects</h2>
        <p>Select a project to sign up for:</p>

        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => handleSignUp('A')}
            style={{ padding: '10px 20px', marginRight: '10px' }}
          >
            Sign Up for Project A
          </button>
          <button
            onClick={() => handleSignUp('B')}
            style={{ padding: '10px 20px' }}
          >
            Sign Up for Project B
          </button>
        </div>

        <h3>Your Signed-Up Projects:</h3>
        {signedUpProjects.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {signedUpProjects.map((project) => (
              <li key={project}>Project {project}</li>
            ))}
          </ul>
        ) : (
          <p>No projects signed up yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
