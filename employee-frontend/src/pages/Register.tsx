import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      await API.post("accounts/register/", data);
      alert("Registered successfully");
      navigate("/", { replace: true });
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Email"
          type="email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button style={styles.button} onClick={handleSubmit}>
          Register
        </button>

        <p
          style={styles.link}
          onClick={() => navigate("/")}
        >
          ← Back to Login
        </p>
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "white",
  },

  card: {
    width: "400px",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.08)",
    boxShadow:
      "0 0 40px rgba(0, 242, 254, 0.3)",
    display: "flex",
    flexDirection: "column",
  },

  title: {
    marginBottom: "30px",
    textAlign: "center",
  },

  input: {
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background:
      "linear-gradient(90deg,#00f2fe,#4facfe)",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  },

  link: {
    marginTop: "20px",
    textAlign: "center",
    cursor: "pointer",
    color: "#00f2fe",
  },
};