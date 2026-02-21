import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

interface Field {
  id?: number;
  label: string;
  field_type: string;
  order: number;
}

export default function FormBuilder() {
  const navigate = useNavigate();
  const { formId } = useParams();

  const isEditMode = !!formId;

  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);

  /* ---------------- Fetch Existing Form (Edit Mode) ---------------- */

  useEffect(() => {
    if (isEditMode) {
      fetchForm();
    }
  }, []);

  const fetchForm = async () => {
    const res = await API.get("forms/list/");
    const selected = res.data.find((f: any) => f.id === Number(formId));

    if (selected) {
      setFormName(selected.name);
      setFields(selected.fields);
    }
  };

  /* ---------------- Field Handlers ---------------- */

  const addField = () => {
    setFields([
      ...fields,
      { label: "", field_type: "text", order: fields.length + 1 },
    ]);
  };

  const updateField = (index: number, key: string, value: string) => {
    const updated = [...fields];
    (updated[index] as any)[key] = value;
    setFields(updated);
  };

  const removeField = async (index: number) => {
    const field = fields[index];

    if (field.id) {
      await API.delete(`forms/field/${field.id}/delete/`);
    }

    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async () => {
    try {
      let currentFormId = formId;

      // Create new form
      if (!isEditMode) {
        const formRes = await API.post("forms/create/", {
          name: formName,
        });
        currentFormId = formRes.data.id;
      } else {
        await API.put(`forms/${formId}/update/`, {
          name: formName,
        });
      }

      // Handle fields
      for (const field of fields) {
        if (field.id) {
          await API.put(`forms/field/${field.id}/update/`, field);
        } else {
          await API.post(`forms/${currentFormId}/add-field/`, field);
        }
      }

      alert("Form saved successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to save form");
    }
  };

  const deleteForm = async () => {
    if (!formId) return;

    await API.delete(`forms/${formId}/delete/`);
    navigate("/dashboard");
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")}>← Back</button>
        <h2>{isEditMode ? "Edit Form" : "Create Form"}</h2>
      </div>

      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />

        <button onClick={addField}>+ Add Field</button>

        {fields.map((field, index) => (
          <div key={index} style={styles.fieldCard}>
            <input
              style={styles.input}
              value={field.label}
              placeholder="Field Label"
              onChange={(e) => updateField(index, "label", e.target.value)}
            />

            <select
              style={styles.input}
              value={field.field_type}
              onChange={(e) => updateField(index, "field_type", e.target.value)}
            >
              <option value="text" style={{ color: "black" }}>
                Text
              </option>
              <option value="number" style={{ color: "black" }}>
                Number
              </option>
              <option value="date" style={{ color: "black" }}>
                Date
              </option>
              <option value="password" style={{ color: "black" }}>
                Password
              </option>
            </select>

            <button style={styles.removeBtn} onClick={() => removeField(index)}>
              Remove
            </button>
          </div>
        ))}

        <button style={styles.saveBtn} onClick={handleSubmit}>
          Save Form
        </button>

        {isEditMode && (
          <button style={styles.deleteBtn} onClick={deleteForm}>
            Delete Form
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "white",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  card: {
    maxWidth: "600px",
    padding: "30px",
    borderRadius: "18px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },
  fieldCard: {
    padding: "15px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  removeBtn: {
    background: "linear-gradient(90deg,#ff416c,#ff4b2b)",
  },
  saveBtn: {
    marginTop: "10px",
  },
  deleteBtn: {
    marginTop: "10px",
    background: "linear-gradient(90deg,#ff0000,#cc0000)",
  },
};
