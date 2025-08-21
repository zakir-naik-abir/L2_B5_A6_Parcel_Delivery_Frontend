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
import { ModeToggle } from "../ModeToggler";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";

const navLink = (
  <>
    <li>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? "text-primary font-semibold" : "font-semibold"
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to={"/about"}
        className={({ isActive }) =>
          isActive ? "text-primary font-semibold" : "font-semibold"
        }
      >
        About
      </NavLink>
    </li>
    <li>
      <NavLink
        to={"/contact"}
        className={({ isActive }) =>
          isActive ? "text-primary font-semibold" : "font-semibold"
        }
      >
        Contact
      </NavLink>
    </li>
    <li>
      <NavLink
        to={"/register"}
        className={({ isActive }) =>
          isActive ? "text-primary font-semibold" : "font-semibold"
        }
      >
        Register
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
    <header className="bg-white shadow fixed w-full z-100">
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
                      xmlns="http://www.w3.org/2000/svg"
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
                  <ul className="flex  flex-col gap-3 text-sm">{navLink}</ul>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link to={"/"} className="block text-teal-600">
                <img src="/logo.jpg" alt="" height={40} width={35} />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">{navLink}</ul>
            </nav>
            <div>
              <ModeToggle />
            </div>

            {/* dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="./avatar.png" alt="Profile image" />
                  </Avatar>
                  {data?.data?.email ? (
                    <div>{data?.data?.imageUrl}</div>
                  ) : (
                    <></>
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="max-w-64">
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
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-4">
                  <LogOutIcon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  {data?.data?.email ? (
                    <>
                      <span onClick={handleLogout}>Logout</span>
                    </>
                  ) : (
                    <>
                      <Link to={'/register'}>Loin</Link>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
              {/* {data?.data?.email ? (
                <div></div>
              ) : (
                <>
                  <DropdownMenuItem>
                    <LogOutIcon
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    <Button onClick={handleLogout}>Login</Button>
                  </DropdownMenuItem>
                </>
              )} */}
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
