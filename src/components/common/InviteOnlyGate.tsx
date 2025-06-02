
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Key } from 'lucide-react';
import { toast } from 'sonner';

interface InviteOnlyGateProps {
  onValidInvite: () => void;
}

const InviteOnlyGate: React.FC<InviteOnlyGateProps> = ({ onValidInvite }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  // For now, using a simple invite code. In production, this would be validated against a database
  const VALID_INVITE_CODES = ['BETA2024', 'EARLY_ACCESS', 'CLOSED_BETA'];

  const handleValidateInvite = async () => {
    if (!inviteCode.trim()) {
      toast.error('Please enter an invite code');
      return;
    }

    setIsValidating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (VALID_INVITE_CODES.includes(inviteCode.toUpperCase())) {
      localStorage.setItem('validInvite', inviteCode);
      toast.success('Welcome to ShareMySeat!');
      onValidInvite();
    } else {
      toast.error('Invalid invite code. Please check and try again.');
    }
    
    setIsValidating(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-brand-blue/10 rounded-full w-fit">
            <Lock className="h-8 w-8 text-brand-blue" />
          </div>
          <CardTitle className="text-2xl">Invitation Required</CardTitle>
          <CardDescription>
            ShareMySeat is currently in closed beta. Please enter your invite code to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="invite" className="text-sm font-medium">
              Invite Code
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="invite"
                type="text"
                placeholder="Enter your invite code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleValidateInvite()}
              />
            </div>
          </div>
          <Button 
            onClick={handleValidateInvite}
            disabled={isValidating}
            className="w-full"
          >
            {isValidating ? 'Validating...' : 'Enter App'}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an invite code? Contact us for early access.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteOnlyGate;
