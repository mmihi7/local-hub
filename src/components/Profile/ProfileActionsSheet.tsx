import React from 'react';
import { Button } from '@/components/ui/button';

const ProfileActionsSheet = ({ onClose }) => {
  const handleActionClick = (action) => {
    console.log(action);
    // Implement action handling logic here
    switch (action) {
      case 'List a Business':
        // Logic to list a business
        break;
      case 'Personalization':
        // Logic for personalization settings
        break;
      case 'Connect Socials':
        // Logic to connect social media accounts
        break;
      case 'Logout':
        // Logic to handle logout
        break;
      default:
        break;
    }
    onClose(); // Close the sheet after action
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Profile Actions</h2>
      <ul className="space-y-2">
        <li>
          <Button variant="ghost" onClick={() => handleActionClick('Account Info')}>
            Account Info
          </Button>
        </li>
        <li>
          <Button variant="ghost" onClick={() => handleActionClick('Personalization')}>
            Personalization
          </Button>
        </li>
        <li>
          <Button variant="ghost" onClick={() => handleActionClick('List a Business')}>
            List a Business
          </Button>
        </li>
        <li>
          <Button variant="ghost" onClick={() => handleActionClick('Connect Socials')}>
            Connect Socials
          </Button>
        </li>
        <li>
          <Button variant="ghost" onClick={() => handleActionClick('Logout')}>
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileActionsSheet;