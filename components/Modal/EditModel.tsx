import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { signIn, signOut } from 'next-auth/react';

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/userRegisterModal";

import Input from "../Input";
import Modal from "../Modal";
import useEditModal from "@/hooks/useEditModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import ImageUpload from "../ImageUpload";

const EditModal = () => {

  const editModal = useEditModal();


  const { data: currentUser } = useCurrentUser();
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setProfileImage(currentUser?.profileImage)
    setCoverImage(currentUser?.coverImage)
    setName(currentUser?.name)
    setUsername(currentUser?.username)
    setBio(currentUser?.bio)
  }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', {
        bio,
        username,
        name,
        profileImage,
        coverImage
      });
      mutateFetchedUser();

      setIsLoading(false)

      toast.success('Account Updated Successfully');





      editModal.onClose();
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [editModal, name, username, bio, mutateFetchedUser, profileImage, coverImage]);

  const bodyContent = (
    <div className="flex flex-col gap-4">

      <ImageUpload value={profileImage} disabled={isLoading} label="Upload Profile Image"
      onChange = {(base64Data) => setProfileImage(base64Data) } />
      <ImageUpload value={coverImage} disabled={isLoading} label="Upload Cover Image"
      onChange = {(base64Data) => setCoverImage(base64Data) } />

      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit"
      actionLabel="Register"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;