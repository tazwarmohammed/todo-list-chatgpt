export function saveProjects(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadProjects() {
  const projectsData = localStorage.getItem('projects');
  if (!projectsData) {
    return null;
  }
  try {
    return JSON.parse(projectsData);
  } catch (e) {
    console.error('Error parsing projects from localStorage', e);
    return null;
  }
}
