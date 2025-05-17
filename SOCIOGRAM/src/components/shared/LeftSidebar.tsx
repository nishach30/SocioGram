import  { useEffect } from 'react'
import { Link, NavLink, useNavigate ,useLocation} from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '../../lib/react-query/queriesAndMutation';
import { useUserContext } from '../../context/AuthContext';
import { sidebarLinks } from '../../constants';
import type  { INavLink } from '../../types';
const LeftSidebar = () => {
    const{mutate:signOut, isSuccess}= useSignOutAccount();
    const navigate = useNavigate();
    const {user} = useUserContext();
    const {pathname}=useLocation();
    useEffect(()=>{
        if(isSuccess){
            navigate(0);
        }
    })
  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
          <img src='/assets/images/logo.svg' 
            alt='logo' 
            width={170} height={36}/>
        </Link>
        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="logo"
          className='h-14 w-14 rounded-full'/>
          <div className='flex flex-col'>
            <p className='body-bold'>
              {user.name}
            </p>
            <p className='small-regular text-zinc-100'>
              @{user.username}
            </p>
          </div>
        </Link>
        <ul className='flex flex-col gap-6'>
          { sidebarLinks.map((link : INavLink, index:number)=>{
              const isActive= pathname===link.route;
              return(
                <div className='leftsidebar-link-container'>
                  <li key={index} className={`leftsidebar-link group ${isActive && 'bg-primary-foreground'}`}>
                  <NavLink to={link.route} className="flex gap-4 items-center p-4">
                    <img 
                      src={link.imgURL}
                      alt={link.label}
                      className={`group-hover:invert-0 ${isActive && 'invert-0'}`}/>
                    {link.label}
                </NavLink>
                </li>
                </div>
              )}
            )
          }
        </ul>
      </div>
      <Button variant='ghost' className='shad-button_ghost'
                onClick={()=>signOut()}>
                    <img src='/assets/icons/logout.svg' alt='logout'/>
                    <p className='small-medium lg:base-medium'>
                      Logout
                    </p>
                </Button>
    </nav>
  )
}

export default LeftSidebar
