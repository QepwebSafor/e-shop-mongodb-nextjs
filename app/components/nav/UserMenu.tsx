"use client";
import { AiFillCaretDown } from "react-icons/ai";
import { useState, useCallback } from "react";
import Avatar from "../products/Avatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className="relative z-30">
        <div onClick={toggleOpen}>
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            className="absolute rounded-md shadow-md w-[170px] bg-white
  overflow-hidden right-0 top-12 text-sm flex
   flex-col cursor-pointer"
          >
            {currentUser ?     (<div>
              <Link href="/orders">
                <MenuItem onClick={toggleOpen}>Your orders</MenuItem>
              </Link>
              <Link href="/admin">
                <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                <hr />
                <MenuItem onClick={() => {toggleOpen();
                signOut({ redirect: false }).then(() => {
                  router.push("/");
                  router.refresh();
                });}}>Logout</MenuItem>
              </Link>
            </div>)
             :   ( <div> <Link href="/login">
            <MenuItem onClick={toggleOpen}>Login</MenuItem>
          </Link>
          <Link href="/register">
            <MenuItem onClick={toggleOpen}>Register</MenuItem>
          </Link>
        </div>)}
       
       
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
