import { useState } from "react"

import "../styles/InteractiveModule.css"

const modules = {
  attacks: {
    title: "Module for Password Attacks",
    description:
      "Learn how common attacks work so you can recognize risky password habits.",
    lessons: [
      {
        title: "Brute-force attacks",
        summary:
          "Attackers try many password combinations until one works. Short and predictable passwords are easier to break.",
        question: "Which password is most vulnerable to brute-force guessing?",
        options: ["sun", "correcthorsebatteryStaple!", "R8!vQ2#pL9"],
        answer: "sun",
        explanation:
          "Very short passwords have fewer possible combinations, so attackers can test them quickly.",
      },
      {
        title: "Dictionary attacks",
        summary:
          "Dictionary attacks use common words, leaked passwords, names, and simple substitutions.",
        question: "Which choice is most likely to appear in a password dictionary?",
        options: ["P@ssw0rd123", "mN7#qL2!vR9", "river-copper-sky-41"],
        answer: "P@ssw0rd123",
        explanation:
          "Common words with predictable substitutions like @ for a and 0 for o are widely tested by attackers.",
      },
      {
        title: "Credential stuffing",
        summary:
          "Attackers reuse passwords from one breached site to access accounts on other services.",
        question: "What makes credential stuffing more dangerous?",
        options: [
          "Using the same password across accounts",
          "Using a password manager",
          "Enabling multi-factor authentication",
        ],
        answer: "Using the same password across accounts",
        explanation:
          "If one site is breached, reused passwords can unlock other accounts that share the same login details.",
      },
      {
        title: "Password spraying",
        summary:
          "Password spraying tries one or two common passwords against many accounts to avoid obvious lockout patterns.",
        question: "What is the main sign of a password spraying attack?",
        options: [
          "One common password tried across many usernames",
          "One account receiving thousands of random guesses",
          "A user changing their password often",
        ],
        answer: "One common password tried across many usernames",
        explanation:
          "Spraying spreads attempts across many accounts, often using passwords like Welcome123 or SeasonYear.",
      },
      {
        title: "Phishing for passwords",
        summary:
          "Phishing tricks users into typing passwords into fake login pages or sharing credentials in messages.",
        question: "Which action is most likely caused by phishing?",
        options: [
          "Entering a password on a fake login page",
          "Creating a random password",
          "Using a password manager to autofill only trusted sites",
        ],
        answer: "Entering a password on a fake login page",
        explanation:
          "Phishing depends on deception, not cracking. The attacker convinces the user to hand over the password.",
      },
      {
        title: "Keylogging",
        summary:
          "Keyloggers record what a user types, including passwords, often through malware or unsafe devices.",
        question: "What does a keylogger try to capture?",
        options: [
          "Typed credentials",
          "Only public profile photos",
          "The color of a website button",
        ],
        answer: "Typed credentials",
        explanation:
          "A keylogger records keystrokes, so typed usernames, passwords, and recovery codes may be exposed.",
      },
      {
        title: "Shoulder surfing",
        summary:
          "Shoulder surfing happens when someone observes a password, PIN, or unlock pattern as it is entered.",
        question: "Which situation is shoulder surfing?",
        options: [
          "Someone watches you type your password in public",
          "A server blocks a weak password",
          "A password manager creates a long password",
        ],
        answer: "Someone watches you type your password in public",
        explanation:
          "This attack relies on physical observation, so privacy screens and awareness help reduce the risk.",
      },
      {
        title: "Social engineering",
        summary:
          "Social engineering pressures people into revealing passwords, reset codes, or account recovery details.",
        question: "What should you do if someone asks for your password by chat?",
        options: [
          "Refuse and verify through an official channel",
          "Send it if they sound urgent",
          "Send only half of the password",
        ],
        answer: "Refuse and verify through an official channel",
        explanation:
          "Legitimate support teams should not need your password. Urgency is often used to bypass good judgment.",
      },
      {
        title: "Offline hash cracking",
        summary:
          "If attackers steal password hashes, they can try guesses offline without touching the real login page.",
        question: "What makes offline cracking especially dangerous?",
        options: [
          "Attackers can test guesses away from the login system",
          "It only works on passwords longer than 30 characters",
          "It requires the user to approve every guess",
        ],
        answer: "Attackers can test guesses away from the login system",
        explanation:
          "Offline attacks can bypass login throttling, so strong password storage and strong user passwords matter.",
      },
      {
        title: "Default password abuse",
        summary:
          "Devices and apps sometimes ship with default passwords that attackers can find in manuals or public lists.",
        question: "What is the safest response to a default password?",
        options: [
          "Change it before using the account or device",
          "Keep it because the vendor chose it",
          "Share it with teammates in plain text",
        ],
        answer: "Change it before using the account or device",
        explanation:
          "Default passwords are widely known or easy to search, so leaving them unchanged creates an easy entry point.",
      },
      {
        title: "Password reset attacks",
        summary:
          "Attackers may target weak recovery questions, insecure email accounts, or exposed reset links.",
        question: "Which recovery setup is weakest?",
        options: [
          "Security questions with public answers",
          "A verified email plus MFA",
          "A short-lived reset link",
        ],
        answer: "Security questions with public answers",
        explanation:
          "Answers like pet names, birthdays, or hometowns may be guessed or found online, weakening account recovery.",
      },
    ],
  },
  practices: {
    title: "Module for Password Security Practices",
    description:
      "Practice choosing stronger passwords and safer account habits.",
    lessons: [
      {
        title: "Use a longer password",
        summary:
          "Longer passwords are harder to guess and crack. Aim for at least 12 characters when possible.",
        question: "Which password is the best choice for strength?",
        options: ["P@ssw0rd123", "correcthorsebatteryStaple!", "abc123ABC!"],
        answer: "correcthorsebatteryStaple!",
        explanation:
          "It is much longer than the other choices, which increases the search space an attacker must test.",
      },
      {
        title: "Include a mix of characters",
        summary:
          "A strong password should combine uppercase, lowercase, numbers, and symbols to increase entropy.",
        question: "What makes a password much harder to crack?",
        options: ["Only letters", "Letters, numbers, and symbols", "Only numbers"],
        answer: "Letters, numbers, and symbols",
        explanation:
          "Mixing character types increases possible combinations and makes guessing less efficient.",
      },
      {
        title: "Avoid reuse across accounts",
        summary:
          "Using the same password on multiple services increases risk if one site is breached.",
        question: "Why should you avoid password reuse?",
        options: [
          "It is easier to remember",
          "A breach on one site can expose other accounts",
          "It makes passwords shorter",
        ],
        answer: "A breach on one site can expose other accounts",
        explanation:
          "Unique passwords limit damage because a stolen password from one service cannot be reused elsewhere.",
      },
      {
        title: "Use unique passwords",
        summary:
          "Each important account should have its own password so one breach does not spread to other services.",
        question: "Which habit best limits damage after one website is breached?",
        options: [
          "Use a different password for every account",
          "Reuse one strong password everywhere",
          "Use the account name as the password",
        ],
        answer: "Use a different password for every account",
        explanation:
          "Unique passwords stop attackers from using one stolen login to access many unrelated accounts.",
      },
      {
        title: "Use a password manager",
        summary:
          "A password manager can generate, save, and fill long unique passwords so users do not need to memorize all of them.",
        question: "What is a main benefit of a password manager?",
        options: [
          "It helps store unique passwords securely",
          "It makes password reuse safer",
          "It removes the need for account security",
        ],
        answer: "It helps store unique passwords securely",
        explanation:
          "Password managers reduce reuse and help users handle long random passwords across many accounts.",
      },
      {
        title: "Enable multi-factor authentication",
        summary:
          "MFA adds another proof of identity, making a stolen password less useful by itself.",
        question: "Why does MFA improve account security?",
        options: [
          "A password alone is not enough to sign in",
          "It makes weak passwords impossible",
          "It lets users share passwords safely",
        ],
        answer: "A password alone is not enough to sign in",
        explanation:
          "MFA requires an additional factor, such as an authenticator app, security key, or approved device.",
      },
      {
        title: "Avoid common passwords",
        summary:
          "Common passwords and leaked passwords should be blocked or changed because attackers test them first.",
        question: "Which password should be avoided?",
        options: ["password123", "river-copper-moon-72", "V9#tQ4!mL2"],
        answer: "password123",
        explanation:
          "Common choices appear in password lists, making them easy targets for dictionary and stuffing attacks.",
      },
      {
        title: "Prefer passphrases",
        summary:
          "A passphrase made from several unrelated words can be long, memorable, and harder to guess.",
        question: "Which option is the best passphrase style?",
        options: [
          "blue-lantern-river-cloud",
          "qwerty",
          "myname2026",
        ],
        answer: "blue-lantern-river-cloud",
        explanation:
          "Several unrelated words create length and unpredictability while staying easier to remember.",
      },
      {
        title: "Do not share passwords",
        summary:
          "Passwords should stay private. Sharing them makes accountability and recovery harder after misuse.",
        question: "What should you do when a teammate asks for your password?",
        options: [
          "Use delegated access or an approved sharing method",
          "Send it in chat",
          "Write it on a sticky note",
        ],
        answer: "Use delegated access or an approved sharing method",
        explanation:
          "Access should be granted through proper account controls, not by exposing a personal password.",
      },
      {
        title: "Change compromised passwords",
        summary:
          "Passwords should be changed when there is evidence of compromise, breach exposure, or suspicious account activity.",
        question: "When should a password be changed immediately?",
        options: [
          "After a confirmed breach or compromise",
          "Every hour for no reason",
          "Only after five years",
        ],
        answer: "After a confirmed breach or compromise",
        explanation:
          "A confirmed leak or suspicious activity means the password may already be known to attackers.",
      },
      {
        title: "Use secure recovery settings",
        summary:
          "Recovery email, phone, and backup codes should be protected because they can unlock password resets.",
        question: "Which recovery practice is safest?",
        options: [
          "Protect recovery email with MFA",
          "Use public facts as recovery answers",
          "Store backup codes in a public note",
        ],
        answer: "Protect recovery email with MFA",
        explanation:
          "If the recovery channel is compromised, attackers may reset passwords even without knowing the current one.",
      },
    ],
  },
}

function shuffleOptions(lessons) {
  return lessons.reduce((result, lesson) => {
    const options = [...lesson.options]

    for (let index = options.length - 1; index > 0; index -= 1) {
      const nextIndex = Math.floor(Math.random() * (index + 1))
      ;[options[index], options[nextIndex]] = [options[nextIndex], options[index]]
    }

    return {
      ...result,
      [lesson.title]: options,
    }
  }, {})
}

export default function InteractiveModule() {
  const [activeModule, setActiveModule] = useState("")
  const [answers, setAnswers] = useState({})
  const [shuffledOptions, setShuffledOptions] = useState({})
  const currentModule = activeModule ? modules[activeModule] : null

  function selectModule(moduleKey) {
    setActiveModule(moduleKey)
    setAnswers({})
    setShuffledOptions(shuffleOptions(modules[moduleKey].lessons))
  }

  function chooseAnswer(lessonTitle, option) {
    setAnswers((current) => ({
      ...current,
      [lessonTitle]: option,
    }))
  }

  function resetModule() {
    if (!currentModule) {
      return
    }

    setAnswers({})
    setShuffledOptions(shuffleOptions(currentModule.lessons))
  }

  return (
    <section className="module">
      <div className="module__header">
        <h2>Interactive Password Practice</h2>
        <p>Read secure password habits and answer a quick question for each module.</p>
      </div>

      <div className="module__tabs" aria-label="Interactive module categories">
        {Object.entries(modules).map(([key, module]) => (
          <button
            className={activeModule === key ? "is-active" : ""}
            key={key}
            type="button"
            onClick={() => selectModule(key)}
          >
            <span>{module.title}</span>
            <small>{module.description}</small>
          </button>
        ))}
      </div>

      {!currentModule && (
        <div className="module__empty">
          Choose a module above to show its lessons and questions.
        </div>
      )}

      {currentModule && (
        <div className="module__lessons">
          <div className="module__actions">
            <h3>{currentModule.title}</h3>
            <button type="button" onClick={resetModule}>
              Reset Module
            </button>
          </div>

          {currentModule.lessons.map((lesson) => {
          const selectedAnswer = answers[lesson.title]
          const answeredWrong =
            selectedAnswer && selectedAnswer !== lesson.answer
          const options = shuffledOptions[lesson.title] || lesson.options

          return (
            <article className="module__lesson" key={lesson.title}>
              <h3>{lesson.title}</h3>
              <p>{lesson.summary}</p>

              <h4>{lesson.question}</h4>

              <div className="module__answers">
                {options.map((option) => {
                  const isSelected = selectedAnswer === option
                  const isCorrect = option === lesson.answer
                  const answerClass = [
                    isSelected ? "is-selected" : "",
                    selectedAnswer && isCorrect ? "is-correct" : "",
                    isSelected && !isCorrect ? "is-wrong" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")

                  return (
                    <button
                      className={answerClass}
                      key={option}
                      type="button"
                      onClick={() => chooseAnswer(lesson.title, option)}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              {answeredWrong && (
                <div className="module__feedback">
                  <strong>Correct answer: {lesson.answer}</strong>
                  <p>{lesson.explanation}</p>
                </div>
              )}
            </article>
          )
        })}
        </div>
      )}
    </section>
  )
}
