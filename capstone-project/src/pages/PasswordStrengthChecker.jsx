import { useMemo, useState } from "react"

import "../styles/Passwordstrength.css"
import { analyzePasswordStrength } from "../utils/PasswordStrengthChecker"

export default function PasswordStrengthChecker() {
  const [visible, setVisible] = useState(false)
  const [password, setPassword] = useState("")

  const strength = useMemo(
    () => analyzePasswordStrength(password),
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
      </div>
    </section>
  )
}
