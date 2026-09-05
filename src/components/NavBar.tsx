import homeLogo from "../assets/my-awesome-logo.png";

export interface NavItems {
  label: string;
  href: string;
}

export interface NavBarProps {
  navItems: NavItems[];
}

export default function NavBar({ navItems }: NavBarProps) {
  return (
    <>
      <nav className="bg-slate-600 px-4 py-2 flex flex-col items-center gap-2 md:flex-row md:justify-between">
        <div>
          <a href="#">
            <img
              src={homeLogo}
              alt="a blue house with the text My Awesome Logo"
              className="h-14"
            />
          </a>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {navItems &&
            navItems.length > 0 &&
            navItems.map((item) => (
              <a
                href={item.href}
                className="p-2 border-b-2 border-b-white/0 hover:border-b-white"
                key={item.href}
              >
                {item.label}
              </a>
            ))}
        </div>
      </nav>
    </>
  );
}
