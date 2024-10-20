"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Icons } from "./ui/icons"
import { authenticateAction } from "../actions/actions"
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Eye, EyeOff } from 'lucide-react';
import type { LucideIcon } from "lucide-react";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [success, setSuccess] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [Icon, setIcon] = React.useState<LucideIcon>(Eye);
  const usernameField = React.useRef<HTMLInputElement>(null);
  const passwordField = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    // Note: There's an issue with autofill where the value is read as blank, so need to poll for the value
    const interval = setInterval(() => {
      if (usernameField.current) {
        setUsername(usernameField.current.value)
        setPassword(passwordField.current!.value)
        clearInterval(interval)
      }
    }, 100)

    if (Cookies.get('message')) {
      setError(Cookies.get('message')!);
    }
    Cookies.remove('message');
  })


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    // console.log("Submitting form", username, password)
    const response = await authenticateAction({username, password})

    if (response.success) {
      setError(null)
      setSuccess("Authentication success!")
      Cookies.set('authToken', response.token!);
      router.push('/home')
    } else {
      setSuccess(null)
      setError("Invalid username or password")
    }
    setIsLoading(false)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit} role="form">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              ref={usernameField}
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              content={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              ref={passwordField}
              onClickIcon={() => setIcon(Icon === Eye ? EyeOff : Eye)}
              id="password"
              placeholder="Password"
              type={Icon === Eye ? "password" : "text"}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              content={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isLoading}
              endIcon={Icon}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
          {success && (
            <p className="text-sm font-semibold text-green-700 text-center" role="alert">
              {success}
            </p> 
          )}
          {error && (
            <p className="text-sm font-semibold text-red-500 text-center" role="alert">
              {error}
            </p> 
          )}
        </div>
      </form>
    </div>
  )
}