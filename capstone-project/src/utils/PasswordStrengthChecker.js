import zxcvbn from "zxcvbn"

function formatCrackTime(crackTimesDisplay) {
  // Reads zxcvbn's crack-time estimate for the most realistic scenario:
  // online throttling at 100 attempts per hour.
  // Output is a friendly sentence for the UI.
  const entry = crackTimesDisplay?.online_throttling_100_per_hour
  if (!entry) return null

  // zxcvbn uses human-friendly labels ("3 minutes", "1 hour", etc.)
  // Some entries can also be `null` depending on password.
  return `This password would be cracked in ${entry}.`
}

function normalizeSequence(sequence) {
  // Converts zxcvbn's `sequence` array into small badge items
  // that we can render in React without depending on zxcvbn internals.
  if (!Array.isArray(sequence)) return []

  // Example from zxcvbn:
  // { pattern: 'dictionary', token: 'password', ... }
  return sequence
    .filter(Boolean)
    .map((s) => {
      const token = s?.token || ""
      const pattern = s?.pattern || "unknown"

      // Badge label shown in UI.
      const label =
        token && token.length > 0
          ? `${pattern}: ${token}`
          : `${pattern}`

      return {
        key: `${pattern}:${token}`,
        label,
        pattern,
        token,
      }
    })
}

export function analyzePasswordStrength(password) {
  // Main adapter between zxcvbn and this app's existing UI.
  // Returns:
  // - strength meter fields: label/score/percent/color/checks
  // - feature fields: crackTimeDisplayText, feedbackWarning, feedbackSuggestions, sequenceBadges
  const emptyChecks = [
    {
      key: "upper",
      label: "Uppercase letters",
      action: "Add uppercase letters",
      passed: false,
    },
    {
      key: "lower",
      label: "Lowercase letters",
      action: "Add lowercase letters",
      passed: false,
    },
    {
      key: "number",
      label: "Numbers",
      action: "Add numbers",
      passed: false,
    },
    {
      key: "symbol",
      label: "Symbols",
      action: "Add symbols",
      passed: false,
    },
  ]

  if (!password) {
    return {
      label: "NONE",
      score: 0,
      percent: 0,
      color: "#1a1a1a",
      checks: emptyChecks,
      crackTimeDisplayText: null,
      feedbackWarning: null,
      feedbackSuggestions: [],
      sequenceBadges: [],
    }
  }

  // zxcvbn provides:
  // - score (0..4) and feedback.warning/suggestions
  // - crack_times_display.*
  // - sequence pattern detection
  const result = zxcvbn(password)

  const score = result.score ?? 0

  // Map zxcvbn score to existing UI label/percent/colors.
  let label = "VERY WEAK"
  let percent = 20
  let color = "#ef4444"

  if (score >= 4) {
    label = "VERY STRONG"
    percent = 100
    color = "#22c55e"
  } else if (score === 3) {
    label = "STRONG"
    percent = 80
    color = "#86efac"
  } else if (score === 2) {
    label = "WEAK"
    percent = 60
    color = "#f97316"
  }

  // Keep your original “checks” as a lightweight complement so the current design works.
  const checks = [
    {
      key: "upper",
      label: "Uppercase letters",
      action: "Add uppercase letters",
      passed: /[A-Z]/.test(password),
    },
    {
      key: "lower",
      label: "Lowercase letters",
      action: "Add lowercase letters",
      passed: /[a-z]/.test(password),
    },
    {
      key: "number",
      label: "Numbers",
      action: "Add numbers",
      passed: /[0-9]/.test(password),
    },
    {
      key: "symbol",
      label: "Symbols",
      action: "Add symbols",
      passed: /[^A-Za-z0-9]/.test(password),
    },
  ]

  return {
    label,
    score,
    percent,
    color,
    checks,
    // === Feature 1: crack time ===
    crackTimeDisplayText: formatCrackTime(result.crack_times_display),
    // === Feature 2: feedback panel ===
    feedbackWarning: result.feedback?.warning ?? null,
    feedbackSuggestions: result.feedback?.suggestions ?? [],
    // === Feature 3: pattern detection badges ===
    sequenceBadges: normalizeSequence(result.sequence),
  }
}
