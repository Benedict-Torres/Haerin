import { useMemo, useState } from "react"

import "../styles/PasswordGenerator.css"
import { analyzePasswordStrength } from "../utils/PasswordStrengthChecker"

const characterSets = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: "!@#$%^&*()_+-=[]{}|;:,.<>?",
}

export default function PasswordGenerator() {
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
    const { name, type, checked, value } = e.target

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : Number(value),
    }))
  }

  function generatePassword() {
    const pool = Object.entries(characterSets)
      .filter(([type]) => settings[type])
      .map(([, characters]) => characters)
      .join("")

    if (!pool) {
      setPassword("")
      return
    }

    const nextPassword = Array.from({ length: settings.length }, () => {
      const index = Math.floor(Math.random() * pool.length)
      return pool[index]
    }).join("")

    setPassword(nextPassword)
  }

  function copyPassword() {
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
