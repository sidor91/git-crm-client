import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ApiProjectService from "../services/api/ApiProjectService";
import { toast } from "react-toastify";

const AddProject: React.FC = () => {
  const [repoPath, setRepoPath] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ApiProjectService.addProject(repoPath);
      navigate("/");
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Repository Path"
          value={repoPath}
          onChange={(e) => setRepoPath(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="e.g., facebook/react"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Project
        </Button>
      </form>
    </Container>
  );
};

export default AddProject;
