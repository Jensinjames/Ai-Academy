import { useEffect, useState } from "react";
import usePrefersDarkMode from "./usePrefersDarkMode";
import System from "../models/system";
import PreeminnetAcademyDark from "./media/logo/preeminent-academy-dark.png";
import PreeminnetAcademyLight from "./media/logo/preeminent-academy-light.png";

export default function useLogo() {
  const [logo, setLogo] = useState("");
  const prefersDarkMode = usePrefersDarkMode();

  useEffect(() => {
    async function fetchInstanceLogo() {
      try {
        const logoURL = await System.fetchLogo(!prefersDarkMode);
        logoURL
          ? setLogo(logoURL)
          : setLogo(
              prefersDarkMode ? PreeminnetAcademyLight : PreeminnetAcademyDark
            );
      } catch (err) {
        setLogo(
          prefersDarkMode ? PreeminnetAcademyLight : PreeminnetAcademyDark
        );
        console.error("Failed to fetch logo:", err);
      }
    }
    fetchInstanceLogo();
  }, [prefersDarkMode]);

  return { logo };
}
