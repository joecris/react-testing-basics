import { useEffect } from "react";

export default function usePageTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    // Optional: Resets the title to the original when the component unmounts
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
