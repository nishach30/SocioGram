import { useGetAllUsers } from '../../lib/react-query/queriesAndMutation';
import Loader from '../../components/shared/Loader';
import type { Models } from 'appwrite';
import UserCard from '../../components/shared/UserCard';

const AllUsers = () => {
  const {data:allUsers , isPending}= useGetAllUsers();
  if(isPending){
    return <Loader/>
  }
  
  return (
      <div className='all_user-container'>
          {
            allUsers?.documents.map((user: Models.Document, index: number)=>
              <UserCard user={user} key={index}/>
            )
          }       
      </div>
  )
}

export default AllUsers