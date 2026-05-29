import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginSchema } from '../validators/studentSchema';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');
    try {
      await login(data.email, data.password);
    } catch (err) {
      setApiError(
        err.response?.data?.message || err.message || 'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animated-gradient-bg relative overflow-hidden">
      {/* Ambient light effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float animation-delay-200" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Login Card */}
      <div className="relative w-full max-w-md animate-scale-in">
        <div className="glass-card p-8 sm:p-10">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 animate-bounce-subtle">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Sign in to{' '}
              <span className="gradient-text-primary font-semibold">
                StudentMS
              </span>{' '}
              to manage your institution
            </p>
          </div>

          {/* Error Message */}
          {apiError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 animate-fade-in">
              <p className="text-sm text-rose-400 text-center">{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@example.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register('password')}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              Sign In
              {!isLoading && <ArrowRight className="w-4 h-4 ml-1" />}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
            <p className="text-xs text-gray-500">
              Student Management System &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Card glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-transparent to-violet-500/10 rounded-2xl blur-xl -z-10" />
      </div>
    </div>
  );
}

export default LoginPage;
