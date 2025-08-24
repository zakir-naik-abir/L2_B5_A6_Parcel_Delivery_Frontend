import { Link, NavLink } from "react-router";
import { LogOutIcon, PinIcon } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLink = (
  <>
    <li>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold"
            : "font-semibold text-gray-500"
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to={"/about"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold"
            : "font-semibold text-gray-500"
        }
      >
        About
      </NavLink>
    </li>
    <li>
      <NavLink
        to={"/contact"}
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold"
            : "font-semibold text-gray-500"
        }
      >
        Contact
      </NavLink>
    </li>
  </>
);

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  console.log(data);

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="bg-red-200 shadow fixed w-full z-100">
      <div className="mx-auto px-4">
        <div className="flex h-13 items-center justify-between">
          {/* menu */}
          <div className="flex items-center justify-center gap-4">
            <div className=" md:hidden flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 hover:bg-transparent"
                  >
                    <svg
                      xmlns=""
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <ul className="flex  flex-col gap-3 text-sm ">{navLink}</ul>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex-1 flex items-center gap-2">
              <Link to={"/"} className="block">
                <img src="/logo.jpg" alt="" height={40} width={35} className="rounded-full"/>
              </Link>
              <i><span className="text-red-500">E</span>asy <span className="text-red-600">P</span>arcel</i>
            </div>
          </div>

          <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">{navLink}</ul>
            </nav>

          <div className="flex items-center gap-5 ">
            
            <ThemeToggle/>

            {/* dropdown */}
            {data?.data?.email ? (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <div>
                        {data?.data?.imageUrl || (
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src="./avatar.png"
                              alt="Profile image"
                            />
                          </Avatar>
                        )}
                      </div>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="max-w-60">
                    <DropdownMenuLabel className="flex min-w-0 flex-col">
                      <span className="text-foreground truncate text-sm font-medium">
                        {data?.data?.name}
                      </span>
                      <span className="text-muted-foreground truncate text-xs font-normal">
                        {data?.data?.email}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <PinIcon
                          size={16}
                          className="opacity-60"
                          aria-hidden="true"
                        />
                        <Link to={"/dashboard"}>Dashboard</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex gap-4">
                      <LogOutIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />

                      <span onClick={handleLogout}>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to={"/register"}>
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
