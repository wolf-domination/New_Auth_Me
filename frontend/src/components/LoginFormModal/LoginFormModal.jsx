import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true); // Set loading to true when form is submitted

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      })
      .finally(() => {
        setLoading(false); // Set loading back to false when the response is received
      });
  };

  return (
    <div className="login-form-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className="error">{errors.credential}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        
        {/* Show loading spinner if loading is true */}
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <button type="submit">Log In</button>
        )}
      </form>
    </div>
  );
}

export default LoginFormModal;
