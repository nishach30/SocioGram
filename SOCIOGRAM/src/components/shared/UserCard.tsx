import type { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const UserCard = ( {user}:  {user: Models.Document} ) => {
  return (
    <div className='user-card'>
        <Link to={`/profile/${user.$id}`}>
            <img 
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='user'
            className='rounded-full w-16 lg:h-16'/>
        </Link>
        <p className='base-medium lg:body-bold text-white'>
            {user.name}
        </p>
        <p className='small-medium  text-gray-400'>
            @{user.username}
        </p>
        <Button type="button" className="shad-button_primary whitespace-nowrap">
            Follow
        </Button>
    </div>
  )
}

export default UserCard