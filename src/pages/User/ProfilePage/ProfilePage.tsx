// import { useEffect, useState } from "react";
// import {apiFetchUser} from "../../../services/authtApi"
export default function ProfilePage() {
    // const [userProfile, setUserProfile] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await apiFetchUser();
    //             setUserProfile(response.data);
    //         } catch (error) {
    //             console.error("Failed to fetch user data:", error);
    //         }
    //     };
    //     fetchUserData();
    // }, []);

    // if (!userProfile) {
    //     return <p className="text-center mt-10">Loading...</p>;
    // }

    // return (
    //     <div className="flex items-center justify-center h-screen bg-gray-100">
    //         <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
    //             <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
    //                 Profile Information
    //             </h2>
    //             <div className="space-y-4">
    //                 {Object.entries(userProfile).map(([key, value]) => (
    //                     <div key={key} className="flex flex-col">
    //                         <label className="text-sm text-gray-500 capitalize">
    //                             {key}
    //                         </label>
    //                         <span className="text-gray-700 font-medium">
    //                             {value ? value.toString() : "N/A"}
    //                         </span>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // );

    const userProfile = {
        email: "user@example.com",
        phone: "+123456789",
        password: "********",
        name: "John Doe",
        birthday: "1990-01-01",
        gender: "Male",
        address: "123 Main St, City, Country",
        idCard: "123456789",
    };

    return (
      
            <div className="text-[#2b6534]">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Profile Information
                </h2>
                <div className="space-y-4">
                    {Object.keys(userProfile).map((field) => (
                        <div key={field} className="flex flex-col">
                            <label className="text-xl font-medium capitalize">
                                {field}
                            </label>
                            <span className="  text-lg">
                                {userProfile[field]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
       
    );
}
