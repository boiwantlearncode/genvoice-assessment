"use client";

import { useRouter } from 'next/navigation'
import { Button } from "./ui/button"
import Cookies from 'js-cookie';

type NavbarProps = {
  route: string;
}

export const Navbar = ({ route } : NavbarProps) => {
  const router = useRouter();

  const logout = () => {
    Cookies.remove('authToken');
    router.push('/login');
  }

  return (
    <div className="flex">
      <Button variant="link" disabled={route === "/home"} onClick={() => router.push('/home')}>Home</Button>
      <Button variant="link" disabled={route === "/settings"} onClick={() => router.push('/settings')}>Settings</Button>
      <Button variant="link" onClick={logout}>Logout</Button>
    </div>
  )
}