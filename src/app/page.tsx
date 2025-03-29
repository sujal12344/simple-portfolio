import Navbar from "./(Header)/Navbar";
import Herobody from "./(Header)/Herobody";
import About from "./(About)/About";
import Skill from "./(Skills)/Skill";
import Project from "./(Projects)/Project";
import Contact from "./(Contact)/Contact";
import Experience from "./(Experience)/Experience";

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full bg-primary-foreground">
        <Navbar />
        <Herobody />
      </div>
      <About />
      <Skill />
      <Experience />
      <Project />
      <Contact />
    </>
  );
}
