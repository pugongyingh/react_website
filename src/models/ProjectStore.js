import projects from "../../public/data/projects.json";

 // const projects = { projects: [] }

const ProjectStore = function() {
  this.all = projects.projects;
};


ProjectStore.prototype.filter = function(tags) {
  return this.all.
    filter(proj => tags.some(tag => proj.tags.indexOf(tag) !== -1))
}
const instance  = new ProjectStore;
export default instance;
