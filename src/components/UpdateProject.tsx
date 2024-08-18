import React, { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import ApiProjectService from "../services/api/ApiProjectService";
import { Project } from "../@types/project";
import { toast } from "react-toastify";

interface UpdateProjectProps {
  open: boolean;
  onClose: () => void;
  project: Project;
}

const UpdateProject: React.FC<UpdateProjectProps> = ({
  open,
  onClose,
  project,
}) => {
  const [formData, setFormData] = useState({
    owner: project.owner || "",
    name: project.name || "",
    url: project.url || "",
    stars: project.stars || 0,
    forks: project.forks || 0,
    issues: project.issues || 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "stars" || name === "forks" || name === "issues"
          ? Number(value)
          : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await ApiProjectService.updateProject(project.id, formData);
      onClose();
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Project</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Update Project Details</Typography>
        <TextField
          label="Owner"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stars"
          name="stars"
          type="number"
          value={formData.stars}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Forks"
          name="forks"
          type="number"
          value={formData.forks}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Issues"
          name="issues"
          type="number"
          value={formData.issues}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProject;
