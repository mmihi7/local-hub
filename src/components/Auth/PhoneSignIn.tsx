
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone } from 'lucide-react';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from '@/components/ui/input-otp';

const PhoneSignIn = () => {
  const { signInWithPhone, verifyTwoFactor, twoFactorPending, isLoading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!twoFactorPending && phoneNumber) {
      await signInWithPhone(phoneNumber);
    } else if (twoFactorPending && verificationCode) {
      await verifyTwoFactor(verificationCode);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!twoFactorPending ? (
        <div className="space-y-4">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-10"
              required
              autoComplete="tel"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending code..." : "Send verification code"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            We've sent a verification code to your phone
          </p>

          <div className="flex justify-center">
            <InputOTP 
              maxLength={6} 
              value={verificationCode} 
              onChange={(value) => setVerificationCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || verificationCode.length !== 6}>
            {isLoading ? "Verifying..." : "Verify and sign in"}
          </Button>

          <div className="text-center">
            <Button 
              variant="link" 
              type="button" 
              onClick={() => setPhoneNumber('')}
              className="text-sm"
            >
              Try a different phone number
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default PhoneSignIn;
