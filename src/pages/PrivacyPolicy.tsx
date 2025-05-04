
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 md:py-12 container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6">Last updated: May 4, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Introduction</h2>
              <p className="mb-3">
                ShareMySeat ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Information We Collect</h2>
              <p className="mb-3">
                We may collect information about you in various ways, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Data:</strong> When you create an account, we collect your email address, name, and any other information you choose to provide.
                </li>
                <li>
                  <strong>Ticket Information:</strong> Information you provide when posting tickets, including travel details, contact information, and pricing.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information on how you use our website, including pages visited, time spent, and interactions.
                </li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">How We Use Your Information</h2>
              <p className="mb-3">We may use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Disclosure of Your Information</h2>
              <p className="mb-3">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist us in operating our website</li>
                <li>Regulatory authorities, when required by law</li>
                <li>Other users, limited to the information you choose to make public on the platform</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Data Security</h2>
              <p>
                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, we cannot guarantee that unauthorized third parties will never be able to defeat those measures or use your personal information for improper purposes.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Your Rights</h2>
              <p className="mb-3">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access the personal information we hold about you</li>
                <li>The right to request correction of your personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to restrict processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                <a href="mailto:privacy@sharemyseat.com" className="text-brand-blue hover:underline">
                  privacy@sharemyseat.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
