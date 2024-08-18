import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ApiProjectService from "../services/api/ApiProjectService";
import { useEffect, useState } from "react";
import { Project } from "../@types/project";
import { toast } from "react-toastify";
import UpdateProject from "../components/UpdateProject";

const ProjectList = () => {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await ApiProjectService.getProjects();
      setProjects(response);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const handleOpenUpdate = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleCloseUpdate = () => {
    setOpen(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    try {
      await ApiProjectService.deleteProject(id);
      const newProjects = projects.filter((project) => project.id !== id);
      setProjects(newProjects);
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };

  return (
    <div>
      <Typography variant="h4">Project List</Typography>
      <Button href="/add" variant="contained" color="primary">
        Add Project
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Owner</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Stars</TableCell>
              <TableCell>Forks</TableCell>
              <TableCell>Issues</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects &&
              projects.length > 0 &&
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.url}
                    </a>
                  </TableCell>
                  <TableCell>{project.stars}</TableCell>
                  <TableCell>{project.forks}</TableCell>
                  <TableCell>{project.issues}</TableCell>
                  <TableCell>
                    {new Date(project.created_at).toUTCString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleOpenUpdate(project)}
                      variant="contained"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleDelete(project.id)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedProject && (
        <UpdateProject
          open={open}
          onClose={handleCloseUpdate}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default ProjectList;
