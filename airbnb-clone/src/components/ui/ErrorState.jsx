function ErrorState({ message }) {
  return (
    <div style={styles.container}>
      <span style={styles.icon}>⚠️</span>
      <h2 style={styles.title}>Something went wrong</h2>
      <p style={styles.message}>{message}</p>
      <button
        style={styles.button}
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    textAlign: 'center',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#333',
  },
  message: {
    color: '#717171',
    fontSize: '15px',
    marginBottom: '24px',
    maxWidth: '400px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#FF385C',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
  },
}

export default ErrorState