import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'

interface SidebarItemProps {
    label: string,
    icon: IconType,
    href?: string,
    onClick?: () => void,
    auth?: boolean,
    alert?: boolean,
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, auth, onClick }) => {
    const {data: currentUser}  = useCurrentUser();
    const router = useRouter();
    const loginModal = useLoginModal();

    const handleClick = useCallback(() => {
        if(onClick){
            return onClick();
        }
        if(auth && !currentUser){
           loginModal.onOpen(); 
        }else if(href){
            router.push(href);
        }
    }, [router, href, auth, loginModal, onClick, currentUser])
   
    return (
        <div onClick={handleClick} className="flex flex-row items-center">
            <div className="
                    relative
                    rounded-full 
                    h-14
                    w-14
                    flex
                    items-center
                    justify-center 
                    p-4
                    hover:bg-slate-300 
                    hover:bg-opacity-10 
                    cursor-pointer 
                    lg:hidden
                ">
                <Icon size={28} color="black" />
                
            </div>
            <div className="
                relative
                hidden 
                lg:flex 
                items-row 
                gap-4 
                p-4 
                rounded-full 
                hover:bg-slate-300 
                hover:bg-opacity-10 
                cursor-pointer
                items-center"
                >
                <Icon size={24} color="black" />
                <p className="hidden lg:block text-black text-xl">
                    {label}
                </p>
                
            </div>
        </div>
    )
}

export default SidebarItem
