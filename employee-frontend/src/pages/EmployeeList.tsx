import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

interface FieldValue {
  id: number;
  field_label: string;
  value: string;
}

interface Employee {
  id: number;
  values: FieldValue[];
}

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  const fetchEmployees = async () => {
    try {
      let url = "employees/list/";

      if (label && value) {
        url += `?label=${label}&value=${value}`;
      }

      const res = await API.get(url);
      setEmployees(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id: number) => {
    try {
      await API.delete(`employees/delete/${id}/`);
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
        <h2 style={{ margin: 0 }}>Employees</h2>
      </div>

      {/* Search Section */}
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          placeholder="Search Label (e.g. name)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Search Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={fetchEmployees}>Search</button>
      </div>

      {/* Employee Cards */}
      <div style={styles.grid}>
        {employees.length === 0 && (
          <p style={{ opacity: 0.6 }}>
            No employees found.
          </p>
        )}

        {employees.map((emp) => (
          <div key={emp.id} style={styles.card}>
            {emp.values.map((v) => (
              <p key={v.id}>
                <strong>{v.field_label}:</strong> {v.value}
              </p>
            ))}

            <button
              style={styles.deleteBtn}
              onClick={() => deleteEmployee(emp.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    padding: "40px",
    background:
      "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0, 242, 254, 0.2)",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "20px",
    borderRadius: "15px",
    backdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.08)",
    boxShadow: "0 0 25px rgba(0, 242, 254, 0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  deleteBtn: {
    marginTop: "10px",
    background: "linear-gradient(90deg,#ff416c,#ff4b2b)",
  },
};