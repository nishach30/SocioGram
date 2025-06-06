import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { z } from "zod"
import { SigninValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import {  useSignInAccount } from '@/lib/react-query/queriesAndMutation'
import { useUserContext } from '@/context/AuthContext'

const SignInForm = () => {
const {mutateAsync: signInAccount} = useSignInAccount();
const {checkAuthUser, isLoading: isUserLoading } = useUserContext();
const navigate = useNavigate();

// 1. Define your form.
const form = useForm<z.infer<typeof SigninValidation>>({
	resolver: zodResolver(SigninValidation),
	defaultValues: {
		email: '',
		password: ''      
	},
})   
// 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof SigninValidation>) {
const session = await signInAccount({email: values.email, password: values.password});

if(!session){
	return toast("Sign in failed. Please try again.")
}


const isLoggedIn = await checkAuthUser();

if(isLoggedIn){
	form.reset();
	navigate('/');
}else{
	return toast( 'Sign up failed. Please try again')
}
}

return (
	<Form {...form}>
		<div className="flex-center flex-col"> 
			{/* sm:w-420 */}
			<img src="/assets/images/logo.svg" alt="logo"/>
			<h2 className='text-white h3-bold md:h2-bold pt-5 sm:pt-12'>Login to your account</h2>
			<p className='text-white small-medium md:base-regular mt-2'>
				Welcome Back! Please enter your details.
			</p>
		
		<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
		
		<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="form-label">Email</FormLabel>
						<FormControl>
							<Input placeholder="Example:leosingh123@xyz.com" type='email' className='shad-input'  {...field}/>
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
							<Input placeholder="Enter Password" type='password' className='shad-input'  {...field}/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<Button type="submit" className='h-14 bg-linear-to-t from-sky-700 to-indigo-500' >
				{isUserLoading?(<div className='flex-center gap-2'>
					<Loader/> Loading...
				</div>):'Sign in'}
			</Button>
			<p className='text-small-regular text-white text-center mt-2'>
				Don't have an account? <Link to='/sign-up' className='text-indigo-500 text-small-semibold ml-1'>Sign up</Link>
			</p>
		</form>
		</div>
	</Form>
)
}

export default SignInForm