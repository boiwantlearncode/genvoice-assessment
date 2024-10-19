"use client";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { changePasswordAction } from "../actions/actions";
import React from "react";

export default function Home() {
  const [oldPassword, setOldPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

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
    <div className="mx-auto flex min-h-screen w-full flex-col justify-center space-y-2 sm:w-[350px]">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-md">Change password</p>
      <Input placeholder="Old password" type="password" content={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
      <Input placeholder="New password" type="password" content={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
      <Input placeholder="Confirm new password" type="password" content={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
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
  );
}
