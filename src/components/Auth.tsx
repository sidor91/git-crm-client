import React, { useState } from "react";
import { TextField, Button, Typography, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

interface AuthProps {
  mode: "login" | "register";
}

const Auth: React.FC<AuthProps> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authorize } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authorize({ email, password, action: mode });
    } catch (error: any) {
      toast(error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4">
        {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </Button>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          marginTop={2}
        >
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Link href="/register" variant="body2">
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" variant="body2">
                Login
              </Link>
            </>
          )}
        </Typography>
      </form>
    </div>
  );
};

export default Auth;
