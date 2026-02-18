function Landing({ onStart }) {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.headline}>
          Turn Basic Prompts Into Powerful AI Instructions
        </h1>

        <p style={styles.subheadline}>
          Velqora helps you optimise, analyse, and score prompts with
          intelligent AI modes — instantly.
        </p>

        {/* IMPORTANT: This is a normal button, NOT a link */}
        <button
          type="button"
          style={styles.cta}
          onClick={() => onStart()}
        >
          Try Velqora
        </button>
      </div>

      <div style={styles.featureGrid}>
        <div style={styles.featureCard}>
          <h3>⚡ Instant Optimisation</h3>
          <p>Rewrite prompts with clarity and structure instantly.</p>
        </div>

        <div style={styles.featureCard}>
          <h3>📊 Prompt Scoring</h3>
          <p>Get clarity, detail, and effectiveness scores.</p>
        </div>

        <div style={styles.featureCard}>
          <h3>🧠 Smart Modes</h3>
          <p>Creative, detailed, or concise — your choice.</p>
        </div>
      </div>

      <div style={styles.footer}>
        © {new Date().getFullYear()} Velqora
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 50% 10%, #1e293b, #020617 70%)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    textAlign: "center",
    fontFamily: "Inter, Arial, sans-serif",
  },
  hero: {
    maxWidth: "760px",
    marginBottom: "60px",
  },
  headline: {
    fontSize: "46px",
    marginBottom: "16px",
    lineHeight: 1.2,
  },
  subheadline: {
    color: "#9ca3af",
    marginBottom: "26px",
    fontSize: "16px",
  },
  cta: {
    padding: "14px 28px",
    background: "#6366f1",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(99,102,241,0.4)",
    transition: "transform 0.15s ease",
  },
  featureGrid: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "900px",
  },
  featureCard: {
    background: "#020617",
    padding: "22px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.05)",
    width: "260px",
  },
  footer: {
    marginTop: "60px",
    color: "#6b7280",
    fontSize: "13px",
  },
};

export default Landing;
