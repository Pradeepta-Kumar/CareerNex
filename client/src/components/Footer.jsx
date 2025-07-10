import { Facebook, Instagram, Twitter, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-8 lg:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">CareerNex</h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Making the web more accessible, beautiful, and user-friendly. Let's
            build something amazing.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Links</h3>
          <ul className="space-y-2 text-sm sm:text-base underline cursor-pointer">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/")}>About</li>
            <li onClick={() => navigate("/")}>Features</li>
            <li onClick={() => navigate("/")}>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm sm:text-base underline cursor-pointer">
            <li onClick={() => navigate("/")}>Privacy Policy</li>
            <li onClick={() => navigate("/")}>Terms of Service</li>
            <li onClick={() => navigate("/")}>Cookie Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-6 mt-2 text-white">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500 transition"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-sky-400 transition"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500 transition"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-gray-400 transition"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs sm:text-sm text-gray-400 mt-10 border-t border-gray-800 pt-6 select-none">
        © {new Date().getFullYear()} CareerNex. All rights reserved.
      </div>
    </footer>
  );
}
