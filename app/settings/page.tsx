"use client";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { changePasswordAction } from "../actions/actions";
import React from "react";
import { Eye, EyeOff } from 'lucide-react';
import type { LucideIcon } from "lucide-react";
import { Navbar } from "../components/Navbar";


export default function Home() {
  const [oldPassword, setOldPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [Icons, setIcons] = React.useState<LucideIcon[]>([Eye, Eye, Eye]);

  const toggleIcon = (index: number) => {
    if (Icons[index] === Eye) {
      let tempIcons = [...Icons];
      tempIcons[index] = EyeOff;
      setIcons(tempIcons);
    } else {
      let tempIcons = [...Icons];
      tempIcons[index] = Eye;
      setIcons(tempIcons);
    }
  }

  const onSubmit = async () => {
    console.log(newPassword, confirmPassword)
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    } else if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    } else {
      const response = await changePasswordAction({ oldPassword, newPassword });
      if (response.success) {
        setSuccess("Password changed successfully");
      } else {
        setError("Incorrect old password");
      }
      console.log(response.savedPassword)
    }
  }

  return (
    <div className="p-8 gap-y-12 flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar route="/settings" />
      <div className="h-full w-full mx-auto flex flex-col justify-center space-y-2 sm:w-[350px]">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-md">Change password</p>
        <Input endIcon={Icons[0]} onClickIcon={() => toggleIcon(0)} placeholder="Old password" type={Icons[0] === Eye ? "password" : "text"} content={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        <Input endIcon={Icons[1]} onClickIcon={() => toggleIcon(1)} placeholder="New password" type={Icons[1] === Eye ? "password" : "text"} content={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
        <Input endIcon={Icons[2]} onClickIcon={() => toggleIcon(2)} placeholder="Confirm new password" type={Icons[2] === Eye ? "password" : "text"} content={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <Button onClick={onSubmit}>Change password</Button>
        {error && (
          <p className="text-sm font-semibold text-red-500 text-center" role="alert">
            {error}
          </p> 
        )}
        {success && (
          <p className="text-sm font-semibold text-green-700 text-center" role="alert">
            {success}
          </p>
        )}
      </div>
    </div>
  );
}
