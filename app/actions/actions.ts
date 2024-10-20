import type { AuthFormRequest, AuthFormResponse, PasswordChange } from "../types/types";
import { SignJWT } from 'jose';

const savedUsername = 'genvoice';
let savedPassword = 'GenVoice123!';

async function generateToken(username: string) {
  // Convert from string to Uint8Array
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

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
    console.log(username, savedUsername, password, savedPassword);
    console.log(username === savedUsername, password === savedPassword);
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