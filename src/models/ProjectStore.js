import projects from "../../public/static/projects.json";

 // const projects = { projects: [] }

const ProjectStore = function() {
  this.all = projects.projects;
};

const instance  = new ProjectStore;
export default instance;
