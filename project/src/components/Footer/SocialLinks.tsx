import React from 'react';
import { Instagram, Facebook, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: '#' },
  { icon: Facebook, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Mail, href: '#' },
];

export default function SocialLinks() {
  return (
    <div className="flex space-x-4">
      {socialLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <a
            key={index}
            href={link.href}
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <Icon className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
}