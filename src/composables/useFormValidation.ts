import { ref, reactive, computed } from 'vue'

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

interface FieldConfig {
  rules: ValidationRule
  label: string
}

export function useFormValidation<T extends Record<string, any>>(fields: { [K in keyof T]: FieldConfig }) {
  const errors = reactive<Record<string, string>>({})
  const touched = reactive<Record<string, boolean>>({})

  function validate(fieldName: keyof T, value: any): string | null {
    const config = fields[fieldName]
    if (!config) return null

    const rules = config.rules

    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${config.label} is required`
    }

    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
      return `${config.label} must be at least ${rules.minLength} characters`
    }

    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      return `${config.label} must be at most ${rules.maxLength} characters`
    }

    if (rules.min !== undefined && typeof value === 'number' && value < rules.min) {
      return `${config.label} must be at least ${rules.min}`
    }

    if (rules.max !== undefined && typeof value === 'number' && value > rules.max) {
      return `${config.label} must be at most ${rules.max}`
    }

    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      return `${config.label} is invalid`
    }

    if (rules.custom) {
      return rules.custom(value)
    }

    return null
  }

  function validateAll(data: T): boolean {
    let isValid = true
    for (const key of Object.keys(fields) as (keyof T)[]) {
      touched[key as string] = true
      const error = validate(key, data[key])
      if (error) {
        errors[key as string] = error
        isValid = false
      } else {
        delete errors[key as string]
      }
    }
    return isValid
  }

  function clearErrors() {
    for (const key of Object.keys(errors)) {
      delete errors[key]
    }
  }

  function resetTouched() {
    for (const key of Object.keys(touched)) {
      touched[key] = false
    }
  }

  const isValid = computed(() => Object.keys(errors).length === 0)

  return {
    errors,
    touched,
    validate,
    validateAll,
    clearErrors,
    resetTouched,
    isValid
  }
}
