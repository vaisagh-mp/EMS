import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await API.post("token/", data);
      login(res.data);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Employee System</h2>
        <p style={styles.subtitle}>Secure Access Portal</p>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            placeholder="Username"
            onChange={(e) =>
              setData({ ...data, username: e.target.value })
            }
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />
        </div>

        <button style={styles.button} onClick={handleSubmit}>
          Login
        </button>

        <p
          style={styles.link}
          onClick={() => navigate("/register")}
        >
          Create Account
        </p>
      </div>
    </div>
  );
}

/* -------------------- Styles -------------------- */

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    fontFamily: "Segoe UI, sans-serif",
  },

  card: {
    width: "380px",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.05)",
    boxShadow:
      "0 0 40px rgba(0, 255, 255, 0.3)",
    color: "white",
    textAlign: "center",
  },

  title: {
    marginBottom: "5px",
    fontSize: "24px",
    fontWeight: "600",
    letterSpacing: "1px",
  },

  subtitle: {
    marginBottom: "30px",
    fontSize: "14px",
    color: "#ccc",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background:
      "linear-gradient(90deg, #00f2fe, #4facfe)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s ease",
  },

  link: {
    marginTop: "20px",
    fontSize: "13px",
    color: "#00f2fe",
    cursor: "pointer",
  },
};