
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Fingerprint, AtSign } from 'lucide-react';

const PasskeyAuth = () => {
  const { signInWithPasskey, signUp, isLoading } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  
  const handlePasskeySignIn = async () => {
    await signInWithPasskey();
  };
  
  const handlePasskeyRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await signUp('passkey', { email });
    }
  };

  if (isRegistering) {
    return (
      <div className="space-y-4">
        <form onSubmit={handlePasskeyRegistration} className="space-y-4">
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            <Fingerprint className="mr-2 h-4 w-4" />
            {isLoading ? "Registering..." : "Register passkey"}
          </Button>
        </form>
        
        <div className="text-center">
          <Button 
            variant="link" 
            type="button" 
            onClick={() => setIsRegistering(false)}
            className="text-sm"
          >
            I already have a passkey
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <Button 
        onClick={handlePasskeySignIn} 
        className="w-full"
        disabled={isLoading}
      >
        <Fingerprint className="mr-2 h-4 w-4" />
        {isLoading ? "Authenticating..." : "Sign in with passkey"}
      </Button>
      
      <div className="text-center">
        <Button 
          variant="link" 
          type="button" 
          onClick={() => setIsRegistering(true)}
          className="text-sm"
        >
          Register a new passkey
        </Button>
      </div>
    </div>
  );
};

export default PasskeyAuth;
