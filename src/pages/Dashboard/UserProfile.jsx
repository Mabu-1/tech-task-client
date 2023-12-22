import  { useContext } from 'react';

import { AuthContext } from '../../providers/AuthProvider';

const UserProfile = () => {
    
    const { user } = useContext(AuthContext);
    const email = user.email;
    const img = user.photoURL;
    const name = user.displayName;

   

    // Filter data based on the user's email
    
    // Check if data exists for the user
   

        return (
            <div className="flex items-center justify-center p-8">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <div className="text-center">
                        <img src={img} alt="User Avatar" className="w-20 h-20 rounded-full mx-auto" />
                        <h1 className="text-lg font-bold mt-4">{name}</h1>
                        <p className="text-gray-500">{email}</p>
                    </div>

                    <hr className="my-4" />

                   
                       
                     
                       
                     
                    </div>
                </div>
           
        );
}

export default UserProfile;
