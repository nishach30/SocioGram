import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { SignupValidation } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  useCreateUserAccount,
  useSignInAccount,
} from '@/lib/react-query/queriesAndMutation';
import { useUserContext } from '@/context/AuthContext';

const SignUpForm = () => {
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast('Sign up failed. Please try again.');
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast('Sign in failed. Please try again.');
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    }
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col">
        {/* sm:w-420 */}
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="text-white h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-white small-medium md:base-regular mt-2">
          To use SocioGram, please enter your details:
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example:Leo Singh"
                    type="text"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example:LeoSingh123"
                    type="text"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example:leosingh123@xyz.com"
                    type="email"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Password"
                    type="password"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-14 bg-linear-to-t from-sky-700 to-indigo-500"
          >
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              'Sign up'
            )}
          </Button>
          <p className="text-small-regular text-white text-center mt-2">
            Already have an account?{' '}
            <Link
              to="/sign-in"
              className="text-indigo-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
