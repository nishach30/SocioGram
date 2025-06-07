
import { Route ,Routes} from 'react-router-dom';
import './App.css'
import SignInForm from './auth/forms/SignInForm';
import SignUpForm from './auth/forms/SignUpForm';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './root/pages';
import AuthLayout from './auth/AuthLayout';
import RootLayout from './root/RootLayout';
import { Toaster } from 'sonner'

function App() {

  return (
    <main className='flex h-screen'>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path='/sign-in' element={<SignInForm/>}/>
          <Route path='/sign-up' element={<SignUpForm/>}/>
        </Route>
        
      <Route element={<RootLayout/>}>
         <Route index element={<Home/>}/>
         <Route path="/explore" element={<Explore/>}/>
         <Route path="/saved" element={<Saved/>}/>
         <Route path="/all-users" element={<AllUsers/>}/>
         <Route path="/create-post" element={<CreatePost/>}/>
         <Route path="/update-post/:id" element={<EditPost/>}/>
         <Route path="/post/:id" element={<PostDetails/>}/>
         <Route path="/profile/:id/*" element={<Profile/>}/>
         <Route path="/update-profile/:id" element={<UpdateProfile/>}/>

      </Route> 
      
      <Route path="*" element={<div className='p-4 text-center text-red-500 text-xl'>404 - Page Not Found</div>} />

      </Routes>
      <Toaster />
    </main>
  )
}

export default App
