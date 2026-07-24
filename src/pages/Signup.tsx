import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { signupThunk } from "../featuers/auth/authThunks";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const resultAction = await dispatch(
        signupThunk({
          name,
          email,
          password,
        }),
      );

      console.log("Signup result:", resultAction);

      if (signupThunk.fulfilled.match(resultAction)) {
        navigate("/login");
      } else {
        console.error("Signup failed:", resultAction.error.message);
        setError("Signup failed.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("User already exists.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              mb: 2,
            }}
          >
            <LockOutlined />
          </Avatar>

          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Register as Admin
          </Typography>

          {error && (
            <Box sx={{ mb: 2 }}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                height: 50,
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>

            <Typography sx={{ mt: 3, textAlign: "center" }}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
