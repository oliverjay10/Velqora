import Landing from "./Landing";
import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState("detailed");
  const [scores, setScores] = useState(null);
  const [summary, setSummary] = useState("");
  const [showTool, setShowTool] = useState(false);


  const optimisePrompt = async () => {
    if (!prompt) return;

    setLoading(true);
    setResult("");
    setScores(null);
    setSummary("");

    try {
      const response = await fetch("https://velqora-backend.onrender.com/optimise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, mode }),
      });

      const data = await response.json();

      setResult(data.improved);
      setScores(data.scores);
      setSummary(data.summary);

      setHistory((prev) => [prompt, ...prev].slice(0, 5));
    } catch (error) {
      setResult("Error connecting to server");
    }

    setLoading(false);
  };

  if (!showTool) {
  return <Landing onStart={() => setShowTool(true)} />;
}

return (

    <div style={styles.page}>
      <div style={styles.appContainer}>
        <div style={styles.header}>
  <div style={styles.logo} onClick={() => setShowTool(false)}>
    Velqora
  </div>

  <div style={styles.nav}>
    <button
      style={styles.backButton}
      onClick={() => setShowTool(false)}
    >
      ← Home
    </button>

    <span style={styles.navItem}>Pricing</span>
    <button style={styles.loginButton}>Login</button>
  </div>
</div>


        <div style={styles.card}>
          <h1 style={styles.title}>AI Prompt Optimiser</h1>
          <p style={styles.subtitle}>
            Turn simple prompts into clear, powerful AI instructions.
          </p>

          <div style={styles.modeSelector}>
            {["creative", "detailed", "short"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  ...styles.modeButton,
                  background: mode === m ? "#6366f1" : "#020617",
                  color: mode === m ? "#fff" : "#9ca3af",
                }}
              >
                {m}
              </button>
            ))}
          </div>

          <textarea
            placeholder="Paste your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            style={styles.textarea}
          />

          <div style={styles.counter}>{prompt.length} characters</div>

          <button
            onClick={optimisePrompt}
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Optimising..." : "Optimise Prompt"}
          </button>

          {result && (
            <div style={styles.resultBox}>
              <h3 style={styles.resultTitle}>Optimised Prompt</h3>
              <p style={styles.resultText}>{result}</p>

              <button
                onClick={() => navigator.clipboard.writeText(result)}
                style={styles.copyButton}
              >
                Copy
              </button>
            </div>
          )}

          {scores && (
            <div style={styles.scoreBox}>
              <h3 style={styles.scoreTitle}>Prompt Score</h3>

              <div style={styles.scoreRow}>
                <span>Clarity</span>
                <span>{scores.clarity}/100</span>
              </div>

              <div style={styles.scoreRow}>
                <span>Detail</span>
                <span>{scores.detail}/100</span>
              </div>

              <div style={styles.scoreRow}>
                <span>Effectiveness</span>
                <span>{scores.effectiveness}/100</span>
              </div>

              <p style={styles.summary}>{summary}</p>
            </div>
          )}

          {history.length > 0 && (
            <div style={styles.historyBox}>
              <h3 style={styles.historyTitle}>Recent Prompts</h3>

              {history.map((item, index) => (
                <div
                  key={index}
                  style={styles.historyItem}
                  onClick={() => setPrompt(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "radial-gradient(circle at 50% 20%, #1e293b, #020617 70%)",
  fontFamily: "Inter, Arial, sans-serif",
},


  card: {
  width: "100%",
  maxWidth: "760px",
  background: "#0b1220",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
  border: "1px solid rgba(255,255,255,0.05)",
},


  title: {
    color: "#fff",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#9ca3af",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #374151",
    background: "#020617",
    color: "#fff",
    fontSize: "15px",
    resize: "none",
  },
  counter: {
    color: "#6b7280",
    fontSize: "13px",
    marginTop: "6px",
  },
  button: {
    width: "100%",
    marginTop: "16px",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#6366f1",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
  },
  resultBox: {
    marginTop: "24px",
    background: "#020617",
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid #374151",
  },
  resultTitle: {
    color: "#fff",
    marginBottom: "10px",
  },
  resultText: {
    color: "#d1d5db",
    whiteSpace: "pre-wrap",
  },
  copyButton: {
    marginTop: "12px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#4b5563",
    color: "#fff",
    cursor: "pointer",
  },

  appContainer: {
  width: "100%",
  maxWidth: "900px",
},

header: {
  height: "60px",
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
},

logo: {
  color: "#fff",
  fontWeight: "600",
  fontSize: "18px",
  letterSpacing: "0.5px",
},

nav: {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: "20px",
},

navItem: {
  color: "#9ca3af",
  fontSize: "14px",
  cursor: "pointer",
},

loginButton: {
  background: "#6366f1",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  color: "#fff",
  fontWeight: "500",
  cursor: "pointer",
},
historyBox: {
  marginTop: "24px",
  borderTop: "1px solid rgba(255,255,255,0.05)",
  paddingTop: "16px",
},

historyTitle: {
  color: "#9ca3af",
  fontSize: "14px",
  marginBottom: "10px",
},

historyItem: {
  padding: "10px",
  borderRadius: "8px",
  background: "#020617",
  color: "#d1d5db",
  marginBottom: "6px",
  cursor: "pointer",
  fontSize: "13px",
},
modeSelector: {
  display: "flex",
  gap: "8px",
  marginBottom: "12px",
},

modeButton: {
  padding: "6px 10px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.05)",
  cursor: "pointer",
  fontSize: "12px",
},
scoreBox: {
  marginTop: "20px",
  background: "#020617",
  padding: "16px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.05)",
},

scoreTitle: {
  color: "#fff",
  marginBottom: "10px",
},

scoreRow: {
  display: "flex",
  justifyContent: "space-between",
  color: "#9ca3af",
  fontSize: "14px",
  marginBottom: "4px",
},

summary: {
  marginTop: "10px",
  color: "#d1d5db",
  fontSize: "13px",
},
backButton: {
  background: "transparent",
  border: "none",
  color: "#9ca3af",
  cursor: "pointer",
  fontSize: "14px",
},




};

export default App;
