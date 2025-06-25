
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-100 border-t border-gray-200 text-gray-700 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo / Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">JobPortal</h2>
          <p className="mt-2 text-sm text-gray-600">Find your <span className="text-green-600">dream job</span> with us. We connect you with top companies.</p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600">About Us</a></li>
            <li><a href="#" className="hover:text-green-600">Careers</a></li>
            <li><a href="#" className="hover:text-green-600">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600">Help Center</a></li>
            <li><a href="#" className="hover:text-green-600">FAQs</a></li>
            <li><a href="#" className="hover:text-green-600">Report a Problem</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl text-blue-600">
            <a href="#" className="hover:text-green-600"><FaFacebook /></a>
            <a href="#" className="hover:text-green-600"><FaTwitter /></a>
            <a href="#" className="hover:text-green-600"><FaLinkedin /></a>
            <a href="#" className="hover:text-green-600"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} <span className="text-blue-600 font-semibold">JobPortal</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

