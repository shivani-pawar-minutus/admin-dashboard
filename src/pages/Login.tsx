import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";

import {
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email,
        password,
      });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error?.response?.data?.message ||
          "Invalid email or password."
      );
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
          width: "100%",
          p: 4,
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

          <Typography
            variant="h4"
            gutterBottom
          >
            Admin Login
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Sign in to continue
          </Typography>

          {error && (
            <Typography
              color="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%" }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type={
                showPassword ? "text" : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                mt: 3,
                height: 50,
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "Login"
              )}
            </Button>

            <Typography
              sx={{
                mt: 3,
                textAlign: "center",
              }}
            >
              Don't have an account?{" "}
              <Link to="/signup">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}