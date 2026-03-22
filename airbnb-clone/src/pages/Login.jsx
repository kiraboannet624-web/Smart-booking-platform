import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      // Save user to localStorage
      const user = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
      }
      localStorage.setItem('user', JSON.stringify(user))

      setLoading(false)
      navigate('/')

      // Reload so App.jsx picks up the new auth state
      window.location.href = '/'
    }, 1000)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <h1 style={styles.logo}>🏠 StayFinder</h1>
        <h2 style={styles.title}>
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h2>
        <p style={styles.subtitle}>
          {isSignup
            ? 'Sign up to start booking amazing places'
            : 'Sign in to access your bookings and favorites'}
        </p>

        {/* Error message */}
        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <div style={styles.form}>
          {isSignup && (
            <div style={styles.field}>
              <label style={styles.label}>Full name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Email address</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : isSignup
              ? 'Create account'
              : 'Sign in'}
          </button>
        </div>

        {/* Toggle signup/login */}
        <p style={styles.toggleText}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsSignup(!isSignup)
              setError('')
            }}
            style={styles.toggleBtn}
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    padding: '24px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '24px',
    color: '#FF385C',
    marginBottom: '24px',
    textAlign: 'center',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#717171',
    marginBottom: '24px',
    textAlign: 'center',
  },
  errorBox: {
    backgroundColor: '#fce4ec',
    color: '#c62828',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  submitBtn: {
    padding: '14px',
    backgroundColor: '#FF385C',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  toggleText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#FF385C',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
  },
}

export default Login