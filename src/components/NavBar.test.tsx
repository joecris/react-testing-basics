import { render, screen } from "@testing-library/react";
import NavBar, { type NavItems } from "./NavBar";

describe("NavBar", () => {
  let navItems: NavItems[] = [];

  beforeEach(() => {
    // reset nav bar items
    navItems = [
      { label: "Docs", href: "#docs" },
      { label: "Quickstart", href: "#quicstart" },
      { label: "Testing", href: "#testing" },
      { label: "Blog", href: "#blog" },
    ];
  });

  test("displays logo as link", () => {
    render(<NavBar navItems={navItems} />);

    const homeLogoLink = screen.getByRole("link", {
      name: "a blue house with the text My Awesome Logo",
    });
    expect(homeLogoLink).toBeInTheDocument();
    expect(homeLogoLink).toHaveAttribute("href", "#");
  });

  test("displays the nav links correctly", () => {
    render(<NavBar navItems={navItems} />);

    navItems.forEach((item) => {
      const navItem = screen.getByRole("link", {
        name: item.label,
      });

      expect(navItem).toBeInTheDocument();
      expect(navItem).toHaveAttribute("href", item.href);
    });
  });
});
