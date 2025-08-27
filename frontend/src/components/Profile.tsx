import React, { useState } from "react";
// import api from "../auth/auth";

const Profile: React.FC = () => {
  const [profile] = useState<any>(null);

//   useEffect(() => {
//     api.get("/auth/me")
//       .then((res) => setProfile(res.data))
//       .catch((err) => console.error("Error:", err));
//   }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome! </h1>
    </div>
  );
};

export default Profile;
