import { useMemo, useState } from "react"

import "../styles/Passwordstrength.css"
import { analyzePasswordStrength } from "../utils/PasswordStrengthChecker"

export default function PasswordStrengthChecker() {
  // UI component: accepts user input and renders zxcvbn-based strength,
  // crack time, feedback, and detected pattern badges.
  const [visible, setVisible] = useState(false)
  const [password, setPassword] = useState("")

  const strength = useMemo(
    () => analyzePasswordStrength(password),
    // Recompute zxcvbn analysis only when password changes.
    [password]
  )

  return (
    <section className="password-checker">
      <div className="password-checker__header">
        <h2>Password Strength Checker</h2>
        <p>
          Paste any password below to evaluate its strength using the same
          criteria as the generator.
        </p>
      </div>

      <div className="password-checker__field-header">
        <label htmlFor="password-strength-input">Enter password</label>
        <button type="button" onClick={() => setVisible((current) => !current)}>
          {visible ? "Hide" : "Show"}
        </button>
      </div>

      <textarea
        id="password-strength-input"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Type or paste a password to check its strength"
        spellCheck="false"
        className={
          visible
            ? "password-checker__input"
            : "password-checker__input password-checker__input--hidden"
        }
      />

      <div className="password-checker__strength">
        <p>
          Checker strength:
          <strong>{strength.label}</strong>
        </p>
        <div className="password-checker__strength-track">
          <span
            style={{
              background: strength.color,
              width: `${strength.percent}%`,
            }}
          />
        </div>
      </div>

      <div className="password-checker__suggestions">
        <p>Suggested action</p>

        {strength.crackTimeDisplayText ? (
          <div style={{ marginBottom: 12, color: "var(--muted)" }}>
            <strong style={{ color: "var(--candy-blue)" }}>Crack time:</strong>{" "}
            {strength.crackTimeDisplayText}
          </div>
        ) : null}

        {strength.feedbackWarning ? (
          <div style={{ marginBottom: 12, color: "var(--muted)" }}>
            <strong style={{ color: "#fbbf24" }}>Warning:</strong> {strength.feedbackWarning}
          </div>
        ) : null}

        {strength.feedbackSuggestions.length > 0 ? (
          <ul>
            {strength.feedbackSuggestions.map((s, idx) => (
              <li key={`${idx}:${s}`}>
                {s}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {strength.checks.map((check) => (
              <li
                className={check.passed ? "is-complete" : ""}
                key={check.key}
              >
                {check.passed ? `${check.label} added` : check.action}
              </li>
            ))}
          </ul>
        )}

        {strength.sequenceBadges.length > 0 ? (
          <div style={{ marginTop: 14 }}>
            <p style={{ fontWeight: 700, marginBottom: 10 }}>Detected patterns</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {strength.sequenceBadges.slice(0, 10).map((b) => (
                <span
                  key={b.key}
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid rgba(178, 213, 229, .2)",
                    borderRadius: 999,
                    color: "var(--muted)",
                    padding: "6px 10px",
                    fontSize: ".85rem",
                  }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
