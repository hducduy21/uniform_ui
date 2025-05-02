import { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/form/Input';
import CheckBox from '@/components/form/CheckBox';
import Button from '@/components/form/Button';
import { LoginCredentials } from '@/types/dto';
import { validateLoginForm } from '@/utils/validate/Validate';
import { useAuthContext } from '@/context/AuthContext';


const Login = () => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginCredentials, string>>>({});

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const {login} = useAuthContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof LoginCredentials]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };
  
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await login(formData)
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="container max-w-3xl px-4 mx-auto">
        <div className="p-8 bg-white border border-gray-100 rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>

          <form onSubmit={handleLogin} noValidate>
              {/* PhoneNumber Fields */}
              <Input
                id="email"
                label="Email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                required
                error={errors.email}
              />

              {/* Password Fields */}
              <Input
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                error={errors.password}
              />

              {/* Show Password Checkbox */}
              <CheckBox
                id="showPassword"
                label="Show password"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full my-2">
                Log In
              </Button>

              {/* Login */}
              <p className="mt-4 text-sm text-center text-gray-600">
                No account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:underline">
                  Register
                </Link>
              </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;