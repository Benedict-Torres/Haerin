export function analyzePasswordStrength(password) {
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

  if (!password) {
    return {
      label: "NONE",
      score: 0,
      percent: 0,
      color: "#1a1a1a",
      checks,
    }
  }

  const lengthPassed = password.length >= 12
  const score =
    checks.filter((check) => check.passed).length + (lengthPassed ? 1 : 0)

  if (score >= 5) {
    return {
      label: "VERY STRONG",
      score,
      percent: 100,
      color: "#22c55e",
      checks,
    }
  }

  if (score >= 4) {
    return {
      label: "STRONG",
      score,
      percent: 80,
      color: "#86efac",
      checks,
    }
  }

  if (score >= 3) {
    return {
      label: "WEAK",
      score,
      percent: 60,
      color: "#f97316",
      checks,
    }
  }

  return {
    label: "VERY WEAK",
    score,
    percent: Math.max(score * 20, 20),
    color: "#ef4444",
    checks,
  }
}
