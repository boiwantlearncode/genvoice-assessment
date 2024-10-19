import type { AuthFormRequest, AuthFormResponse } from "../types/types";
import { SignJWT } from 'jose';  // Import the SignJWT class from jose

const secretKey = 'GenVoiceAI';

export async function generateToken(username: string, secretKey: string) {
  // Convert from string to Uint8Array
  const secret = new TextEncoder().encode(secretKey);
  // const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // Create a JWT token with a payload and set expiration
  const jwt = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);  

  return jwt;
}

export const authenticateAction = async ({ username, password } : AuthFormRequest): Promise<AuthFormResponse> => {
  const validUsername = 'genvoice';
  const validPassword = 'GenVoice123!';
  
  if (username === validUsername && password === validPassword) {
    const token = await generateToken(username, secretKey);
    return { success: true, token: token };
  } else {
    return { success: false };
  }
};
