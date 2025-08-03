import React from 'react';

function Footer() {
  return (
    <footer className="bg-white shadow mt-10 shadow-lg border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Wellness Session App. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
