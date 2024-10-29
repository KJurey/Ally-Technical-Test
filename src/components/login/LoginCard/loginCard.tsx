"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { login, signup, loading, error } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFormErrors({});
  };

  return (
    <Box className="min-h-screen w-[45%] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6">
          <Typography variant="h4" className="text-center font-bold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </Typography>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={!!formErrors.name}
                helperText={formErrors.name}
                className="bg-white"
                disabled={loading}
                autoComplete="name"
              />
            )}

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!!formErrors.email}
              helperText={formErrors.email}
              className="bg-white"
              disabled={loading}
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={!!formErrors.password}
              helperText={formErrors.password}
              className="bg-white"
              disabled={loading}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />

            {!isLogin && (
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                className="bg-white"
                disabled={loading}
                autoComplete="new-password"
              />
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 h-12"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <Button
            fullWidth
            variant="text"
            onClick={handleToggleMode}
            className="mt-2 text-blue-600"
            disabled={loading}
          >
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Login"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
