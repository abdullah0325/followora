'use client';

export default function GlobalError({ error, reset }) {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Something went wrong</h2>

      <p>
        A critical error occurred.
      </p>

      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          background: '#ec4899',
          color: '#fff',
          borderRadius: 6,
        }}
      >
        Try again
      </button>
    </div>
  );
}
