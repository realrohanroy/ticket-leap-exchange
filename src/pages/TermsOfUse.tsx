
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Info, Shield, Flag, User, LinkIcon, Check } from 'lucide-react';
import { TermSection, KeyTakeaway } from '@/types';
import Footer from '@/components/layout/Footer';

const TermsOfUse = () => {
  const termSections: TermSection[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: 'This website is a platform where users can list and discover unused intercity rail or bus tickets. We do not sell, buy, or validate any tickets. By using this platform, you agree to these terms.'
    },
    {
      id: 'account',
      title: '2. Account Registration',
      content: [
        'Users must be 18+ or use under adult supervision.',
        'One account per person is permitted.',
        'Users are responsible for maintaining the security of their account.'
      ]
    },
    {
      id: 'listings',
      title: '3. Ticket Listings',
      content: [
        'Users may only list tickets they legally possess.',
        'Posting fake, invalid, or already-used tickets is prohibited.',
        'Listings remain visible until the travel date/time, after which they are automatically marked as expired.'
      ]
    },
    {
      id: 'ticket-use',
      title: '4. Ticket Use',
      content: [
        'The platform does not facilitate or guarantee the transfer of ticket ownership.',
        'All coordination between users happens externally to this platform.',
        'Users are responsible for verifying the validity of tickets before any transaction.'
      ]
    },
    {
      id: 'prohibited',
      title: '5. Prohibited Conduct',
      content: [
        'Posting fraudulent or misleading ticket information.',
        'Misusing contact information obtained through the platform.',
        'Using bots or automated methods to scrape the site.'
      ]
    },
    {
      id: 'reporting',
      title: '6. Reporting and Moderation',
      content: [
        'Users can and should report suspicious listings.',
        'Administrators may suspend listings or accounts without prior notice if violations are detected.',
        'We appreciate community vigilance in maintaining platform integrity.'
      ]
    },
    {
      id: 'liability',
      title: '7. Limitation of Liability',
      content: 'We are not liable for any losses, damages, or disputes that arise between users. All transactions and communications are at users\' own risk.'
    },
    {
      id: 'termination',
      title: '8. Termination',
      content: 'Users violating these terms may have their access to the platform removed temporarily or permanently.'
    },
    {
      id: 'changes',
      title: '9. Changes to Terms',
      content: 'Terms may be updated occasionally. Continued use of the platform after changes implies acceptance of the new terms.'
    }
  ];

  const keyTakeaways: KeyTakeaway[] = [
    {
      icon: 'info',
      title: 'Discovery Platform Only',
      description: 'We only help users find tickets; we don\'t handle sales or validate tickets.'
    },
    {
      icon: 'shield',
      title: 'User Verification',
      description: 'Always verify ticket validity before any transaction.'
    },
    {
      icon: 'flag',
      title: 'Report Suspicious Listings',
      description: 'Help keep our community safe by reporting suspicious listings.'
    },
    {
      icon: 'user',
      title: 'Account Responsibility',
      description: 'One account per user; keep your credentials secure.'
    },
    {
      icon: 'link',
      title: 'External Coordination',
      description: 'All transfers and payments happen outside our platform.'
    }
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'info':
        return <Info className="h-5 w-5" />;
      case 'shield':
        return <Shield className="h-5 w-5" />;
      case 'flag':
        return <Flag className="h-5 w-5" />;
      case 'user':
        return <User className="h-5 w-5" />;
      case 'link':
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
          
          <Alert variant="warning" className="mb-8">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription className="font-medium">
              We do not facilitate ticket transfers or guarantee validity of tickets. Users are responsible for verifying ticket authenticity.
            </AlertDescription>
          </Alert>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
              <Info className="mr-2 h-5 w-5" /> Key Takeaways
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyTakeaways.map((takeaway) => (
                <div key={takeaway.title} className="flex items-start p-3 bg-white rounded border border-blue-100">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-700">
                    {renderIcon(takeaway.icon)}
                  </div>
                  <div>
                    <h3 className="font-medium">{takeaway.title}</h3>
                    <p className="text-sm text-gray-600">{takeaway.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-green-600" /> Building a Trustworthy Community
            </h2>
            <p className="mb-4">At TicketLeap, we're committed to creating a safe, honest platform where travelers can help each other. To build trust:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Always verify ticket validity before arranging any transaction</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Report suspicious listings promptly</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Provide accurate information about your tickets</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Be respectful in all communications</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Remember each user is limited to 2 active ticket listings to ensure fairness</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-8">
            {termSections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                {Array.isArray(section.content) ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {section.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{section.content}</p>
                )}
                <Separator className="mt-6" />
              </div>
            ))}
          </div>
          
          <div className="mt-10 p-4 bg-gray-50 border rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Last updated: April 11, 2025. By continuing to use this platform, you agree to these terms.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfUse;
