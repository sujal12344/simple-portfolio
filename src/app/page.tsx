import Navbar from "./(Header)/Navbar";
import Herobody from "./(Header)/Herobody";
import About from "./(About)/About";
import Skill from "./(Skills)/Skill";
import Project from "./(Projects)/Project";
import Contact from "./(Contact)/Contact";
import AppNavbar from "@/components/app-navbar";
import Experience from "./(Experience)/Experience";

export default function Home() {
  return (
    <>
      <div className="h-screen w-full bg-primary-foreground">
        <Navbar />
        <Herobody />
        <AppNavbar /> {/* Display only at mobile for bottom Navbar */}
      </div>
      <About />
      <Skill />
      <Experience />
      <Project />
      <Contact />
    </>
  );
}
