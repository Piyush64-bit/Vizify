"use client"

import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

interface PasswordStrengthProps {
  password: string
}

interface PasswordRule {
  id: string
  label: string
  test: (password: string) => boolean
}

const passwordRules: PasswordRule[] = [
  {
    id: "length",
    label: "At least 8 characters long",
    test: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    label: "Contains uppercase letter (A-Z)",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    label: "Contains lowercase letter (a-z)",
    test: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    label: "Contains at least one number (0-9)",
    test: (password) => /\d/.test(password),
  },
  {
    id: "special",
    label: "Contains special character (!@#$%^&*)",
    test: (password) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  },
  {
    id: "noSpaces",
    label: "No spaces allowed",
    test: (password) => !/\s/.test(password),
  },
]

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrengthScore = () => {
    return passwordRules.filter((rule) => rule.test(password)).length
  }

  const getStrengthLevel = () => {
    const score = getStrengthScore()
    if (score <= 2) return { level: "Weak", color: "text-red-400", bgColor: "bg-red-400" }
    if (score <= 4) return { level: "Medium", color: "text-yellow-400", bgColor: "bg-yellow-400" }
    return { level: "Strong", color: "text-green-400", bgColor: "bg-green-400" }
  }

  const strength = getStrengthLevel()
  const score = getStrengthScore()

  if (!password) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 p-3 bg-white/5 rounded-lg border border-white/10"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-white font-medium">Password Strength</span>
        <span className={`text-sm font-medium ${strength.color}`}>{strength.level}</span>
      </div>

      {/* Strength Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(score / passwordRules.length) * 100}%` }}
          className={`h-2 rounded-full transition-all duration-300 ${strength.bgColor}`}
        />
      </div>

      {/* Password Rules */}
      <div className="space-y-2">
        <p className="text-xs text-gray-400 mb-2">Password must meet the following requirements:</p>
        {passwordRules.map((rule) => {
          const isValid = rule.test(password)
          return (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  isValid ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                {isValid ? <Check className="w-2.5 h-2.5 text-white" /> : <X className="w-2.5 h-2.5 text-gray-400" />}
              </div>
              <span className={`text-xs ${isValid ? "text-green-400" : "text-gray-400"}`}>{rule.label}</span>
            </motion.div>
          )
        })}
      </div>

      {score === passwordRules.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 p-2 bg-green-500/20 border border-green-500/30 rounded-lg"
        >
          <p className="text-xs text-green-400 text-center">✓ Great! Your password is strong and secure.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
