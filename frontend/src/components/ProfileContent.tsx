import React from "react";

type ProfileProps = {
  profile: {
    _id: string;
    email: string;
    name?: string;
    bio?: string;
    createdAt?: string;
  };
};

const ProfileContent: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Name:</strong> {profile.name || "Not set"}</p>
      <p><strong>Bio:</strong> {profile.bio || "No bio available"}</p>
      {profile.createdAt && (
        <p><strong>Joined:</strong> {new Date(profile.createdAt).toDateString()}</p>
      )}
    </div>
  );
};

export default ProfileContent;
