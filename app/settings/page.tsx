import Image from "next/image";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-md">Change password</p>
      <Input placeholder="Old password" type="password" />
      <Button>Change password</Button>
    </div>
  );
}
