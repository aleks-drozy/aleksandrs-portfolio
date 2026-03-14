import { describe, it, expect } from 'vitest'

function validate(form: { name: string; email: string; message: string }) {
  const errs: Partial<typeof form> = {}
  if (!form.name.trim()) errs.name = 'Name is required'
  if (!form.email.trim()) errs.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
  if (!form.message.trim()) errs.message = 'Message is required'
  return errs
}

describe('Contact form validation', () => {
  it('returns errors for empty form', () => {
    const errs = validate({ name: '', email: '', message: '' })
    expect(errs.name).toBe('Name is required')
    expect(errs.email).toBe('Email is required')
    expect(errs.message).toBe('Message is required')
  })
  it('returns email error for invalid format', () => {
    const errs = validate({ name: 'Alex', email: 'notanemail', message: 'Hello' })
    expect(errs.email).toBe('Invalid email')
  })
  it('returns no errors for valid form', () => {
    const errs = validate({ name: 'Alex', email: 'alex@example.com', message: 'Hello' })
    expect(Object.keys(errs)).toHaveLength(0)
  })
})
