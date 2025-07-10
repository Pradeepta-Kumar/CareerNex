import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth, signout_user } from "@/store/auth-slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(signout_user()).then((data) => {
      if (data?.payload?.success) {
        toast.success("Signed-out successful!", {
          description: "logged out of Commune-ai.",
        });
        navigate("/");
      } else {
        toast.error("Sign-out failed!", {
          description: "Couldn't sign-out of Commune-ai.",
        });
      }
    });
  };

  const name = user?.fullname || user?.name;

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          className="text-2xl sm:text-3xl font-bold text-white cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          CareerNex
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-5">
          {!isAuthenticated ? (
            <Link to={"/auth/sign-in"}>
              <Button className="bg-gray-700 text-white rounded-full px-4 py-1 text-sm sm:text-base hover:bg-gray-600 transition">
                Sign-In
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="bg-white cursor-pointer w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarFallback className="text-black bg-white font-extrabold text-lg sm:text-xl">
                    {name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 z-50 bg-white text-black shadow-lg cursor-auto"
                side="bottom"
                align="end"
              >
                <DropdownMenuLabel className="whitespace-normal">
                  Logged in as <br /> <strong>{name}</strong>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
