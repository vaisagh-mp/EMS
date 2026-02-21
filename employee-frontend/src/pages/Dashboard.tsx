import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

interface FormField {
  id: number;
  label: string;
  field_type: string;
  order: number;
}

interface DynamicForm {
  id: number;
  name: string;
  fields: FormField[];
}

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [forms, setForms] = useState<DynamicForm[]>([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await API.get("forms/list/");
      setForms(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------- Logout ---------- */
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  /* ---------- Delete Form ---------- */
  const deleteForm = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this form?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`forms/${id}/delete/`);
      fetchForms();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Top Navigation */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>EMS Control Panel</h2>

        <div style={styles.navActions}>
          <button onClick={() => navigate("/form-builder")}>
            + Create Form
          </button>

          <button onClick={() => navigate("/employees")}>
            Employees
          </button>

          <button
            style={styles.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h3 style={styles.sectionTitle}>Available Forms</h3>

        {forms.length === 0 && (
          <p style={{ opacity: 0.6 }}>
            No forms created yet.
          </p>
        )}

        <div style={styles.cardGrid}>
          {forms.map((form) => (
            <div key={form.id} style={styles.card}>
              
              {/* Card Header with Icons */}
              <div style={styles.cardHeader}>
                <h4 style={{ margin: 0 }}>{form.name}</h4>

                <div style={styles.iconGroup}>
                  <span
                    style={styles.editIcon}
                    onClick={() =>
                      navigate(`/form-builder/${form.id}`)
                    }
                    title="Edit Form"
                  >
                    ✏️
                  </span>

                  <span
                    style={styles.deleteIcon}
                    onClick={() => deleteForm(form.id)}
                    title="Delete Form"
                  >
                    🗑
                  </span>
                </div>
              </div>

              <p style={{ opacity: 0.6 }}>
                {form.fields.length} fields
              </p>

              <button
                style={styles.cardButton}
                onClick={() =>
                  navigate(`/create-employee/${form.id}`)
                }
              >
                Create Employee
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------- Styles ---------------------- */

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    background:
      "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "white",
  },

  navbar: {
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    backdropFilter: "blur(12px)",
    background: "rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },

  logo: {
    fontSize: "20px",
    fontWeight: 600,
    letterSpacing: "1px",
  },

  navActions: {
    display: "flex",
    gap: "15px",
  },

  logoutBtn: {
    background: "linear-gradient(90deg,#ff416c,#ff4b2b)",
  },

  content: {
    padding: "40px",
  },

  sectionTitle: {
    marginBottom: "25px",
    fontSize: "18px",
    fontWeight: 500,
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "25px",
    borderRadius: "18px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.08)",
    boxShadow:
      "0 0 25px rgba(0, 242, 254, 0.2)",
    transition: "0.3s ease",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  iconGroup: {
    display: "flex",
    gap: "10px",
  },

  editIcon: {
    cursor: "pointer",
    fontSize: "18px",
  },

  deleteIcon: {
    cursor: "pointer",
    fontSize: "18px",
    color: "#ff4b2b",
  },

  cardButton: {
    marginTop: "15px",
    width: "100%",
  },
};