
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm dark:bg-black/50" : "py-5 bg-transparent"
    }`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-semibold text-sm">T</span>
          </div>
          <span className="font-medium text-lg">TeachBot</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === "/" ? "text-primary" : ""}`}>
            Home
          </Link>
          <Link to="/chat" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === "/chat" ? "text-primary" : ""}`}>
            Chat
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {location.pathname !== "/chat" && (
            <Button asChild size="sm" className="rounded-full transition-all hover:scale-105">
              <Link to="/chat">Start Learning</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
