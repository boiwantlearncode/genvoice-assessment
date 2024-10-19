import type { AuthFormRequest, AuthFormResponse, PasswordChange } from "../types/types";
import { SignJWT } from 'jose';  // Import the SignJWT class from jose

let savedUsername = 'genvoice';
let savedPassword = 'GenVoice123!';

async function generateToken(username: string) {
  // Convert from string to Uint8Array
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

  // Create a JWT token with a payload and set expiration
  const jwt = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);  

  return jwt;
}

const authenticateAction = async ({ username, password } : AuthFormRequest): Promise<AuthFormResponse> => {  
  if (username === savedUsername && password === savedPassword) {
    const token = await generateToken(username);
    return { success: true, token: token };
  } else {
    return { success: false };
  }
};

const changePasswordAction = async ({ oldPassword, newPassword } : PasswordChange) => {  
  if (oldPassword === savedPassword) {
    savedPassword = newPassword;
    return { success: true, savedPassword: savedPassword };
  } else {
    return { success: false, savedPassword: savedPassword };
  }
}


export { authenticateAction, changePasswordAction };