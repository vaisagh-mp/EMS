import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function CreateEmployee() {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<DynamicForm | null>(null);
  const [values, setValues] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchForm();
  }, []);

  const fetchForm = async () => {
    try {
      const res = await API.get("forms/list/");
      const selected = res.data.find(
        (f: DynamicForm) => f.id === Number(formId)
      );
      setForm(selected);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!form) return;

    const payload = {
      form: form.id,
      values: form.fields.map((field) => ({
        field: field.id,
        value: values[field.id] || "",
      })),
    };

    try {
      await API.post("employees/create/", payload);
      alert("Employee created successfully");
      navigate("/employees");
    } catch (error) {
      console.error(error);
      alert("Failed to create employee");
    }
  };

  if (!form)
    return (
      <div style={styles.loadingWrapper}>
        <p>Loading form...</p>
      </div>
    );

  return (
    <div style={styles.wrapper}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <button onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      {/* Form Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>{form.name}</h2>

        {form.fields.map((field) => (
          <div key={field.id} style={styles.inputGroup}>
            <label style={styles.label}>{field.label}</label>
            <input
              type={field.field_type}
              style={styles.input}
              onChange={(e) =>
                setValues({
                  ...values,
                  [field.id]: e.target.value,
                })
              }
            />
          </div>
        ))}

        <button
          style={styles.submitBtn}
          onClick={handleSubmit}
        >
          Submit Employee
        </button>
      </div>
    </div>
  );
}

/* ------------------ Styles ------------------ */

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    color: "white",
  },

  topBar: {
    width: "100%",
    maxWidth: "800px",
    marginBottom: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "800px",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.08)",
    boxShadow:
      "0 0 30px rgba(0, 242, 254, 0.25)",
  },

  title: {
    marginBottom: "30px",
    fontSize: "24px",
    fontWeight: 600,
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    opacity: 0.8,
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },

  submitBtn: {
    marginTop: "20px",
    width: "100%",
  },

  loadingWrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "white",
  },
};