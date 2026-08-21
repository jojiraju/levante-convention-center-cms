import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      if (values.username === 'admin' && values.password === 'admin123') {
        toast.success('Successfully logged in!');
        onLogin();
      } else {
        toast.error('Invalid credentials. Use admin / admin123');
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/logo.png" alt="Levante Logo" className="login-logo" />
          <h2>Admin Portal</h2>
          <p>Sign in to manage your bookings</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your username"
            />
            {formik.touched.username && formik.errors.username ? (
              <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px' }}>{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px' }}>{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" className="btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  );
}
