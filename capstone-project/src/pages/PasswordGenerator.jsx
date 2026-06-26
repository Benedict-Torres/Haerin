import { useMemo, useState } from "react"

import "../styles/PasswordGenerator.css"
import { analyzePasswordStrength } from "../utils/PasswordStrengthChecker"
import { secureRandom } from "../utils/WebSecurity"

const characterSets = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: "!@#$%^&*()_+-=[]{}|;:,.<>?",
}

export default function PasswordGenerator() {
  // UI component: generates passwords based on user-selected options
  // and displays strength + zxcvbn explanations (crack time, feedback, patterns).
  const [settings, setSettings] = useState({
    upper: true,
    lower: true,
    number: true,
    symbol: true,
    length: 16,
  })
  const [password, setPassword] = useState("")

  const strength = useMemo(() => analyzePasswordStrength(password), [password])

  function handleChange(e) {
    // Updates generator settings (checkboxes + length slider)
    // so the next generated password matches user preferences.

    const { name, type, checked, value } = e.target

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : Number(value),
    }))
  }

  function generatePassword() {
    // Produces a new password string from the allowed character pool
    // using crypto-unaware Math.random (kept as-is to avoid design changes).

    const pool = Object.entries(characterSets)
      .filter(([type]) => settings[type])
      .map(([, characters]) => characters)
      .join("")

    if (!pool) {
      setPassword("")
      return
    }

    const nextPassword = Array.from({ length: settings.length }, () => {
      // Uses crypto-secure randomness from WebSecurity.js
      // for better security than Math.random.
      const index = secureRandom(pool.length)
      return pool[index]
    }).join("")

    setPassword(nextPassword)
  }

  function copyPassword() {
    // Copies the generated password to the clipboard.

    if (password) {
      navigator.clipboard.writeText(password)
    }
  }

  return (
    <section className="password-generator">
      <div className="password-generator__header">
        <h2>Password Generator</h2>
        <p>Create strong passwords and learn secure password habits.</p>
      </div>

      <div className="password-generator__output">
        <div className="password-generator__password">
          {password || "Your secure password appears here"}
        </div>
        <button
          className="password-generator__copy"
          type="button"
          onClick={copyPassword}
          disabled={!password}
        >
          Copy
        </button>
      </div>

      <div className="password-generator__length-row">
        <span>Length:</span>
        <strong>{settings.length}</strong>
      </div>

      <input
        className="password-generator__range"
        type="range"
        name="length"
        min="8"
        max="64"
        value={settings.length}
        onChange={handleChange}
      />

      <div className="password-generator__options">
        <label>
          <input
            type="checkbox"
            name="upper"
            checked={settings.upper}
            onChange={handleChange}
          />
          Uppercase
        </label>

        <label>
          <input
            type="checkbox"
            name="lower"
            checked={settings.lower}
            onChange={handleChange}
          />
          Lowercase
        </label>

        <label>
          <input
            type="checkbox"
            name="number"
            checked={settings.number}
            onChange={handleChange}
          />
          Numbers
        </label>

        <label>
          <input
            type="checkbox"
            name="symbol"
            checked={settings.symbol}
            onChange={handleChange}
          />
          Symbols
        </label>
      </div>

      <div className="password-generator__strength">
        <p>
          Password strength:
          <strong>{strength.label}</strong>
        </p>
        <div className="password-generator__strength-track">
          <span
            style={{
              background: strength.color,
              width: `${strength.percent}%`,
            }}
          />
        </div>

        {strength.crackTimeDisplayText ? (
          <p style={{ marginTop: 10, color: "var(--muted)" }}>
            <strong style={{ color: "var(--candy-blue)" }}>Crack time:</strong>{" "}
            {strength.crackTimeDisplayText}
          </p>
        ) : null}

        {strength.feedbackWarning ? (
          <p style={{ marginTop: 10, color: "var(--muted)" }}>
            <strong style={{ color: "#fbbf24" }}>Warning:</strong> {strength.feedbackWarning}
          </p>
        ) : null}

        {strength.sequenceBadges.length > 0 ? (
          <div style={{ marginTop: 12 }}>
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

      <button
        className="password-generator__generate"
        type="button"
        onClick={generatePassword}
      >
        Generate Password
      </button>
    </section>
  )
}
