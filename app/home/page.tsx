import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="p-8 flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar route="/home" />
      <div className="p-8 pb-20 sm:p-20">
        <div>
          <h2 className="text-xl font-bold mb-4">Hello! I'm Isa Bin Mohamed Yamin, a Year 2 Computer Engineering student in Nanyang Technological University.</h2>
          <p>Throughout the years, I've picked up various hobbies trying to find something that would give me the stimulation I need to feel alive. And so far, I've been drawn to strength training, reading manhwas and occasionally going back to playing runescape.</p>
          <br/>
          <p>I consider myself reasonably skilled in front-end development (at least for an intern), which involves designing user experiences, and creating components and functions. In addition to my frontend skills, I’ve worked extensively with modern libraries and frameworks like <strong>React</strong> and <strong>React Native</strong>, integrating tools such as <strong>Tailwind CSS</strong> for consistent design systems. I've also developed mobile applications using <strong>Flutter</strong>, implemented backend systems using <strong>Node.js</strong> and <strong>Express</strong>, and have experience managing larger projects using <strong>Git</strong> and <strong>Docker</strong>.</p> 
          <br/> 
          <p>Recently, I managed a React UI component library project called <strong>@crease/react</strong>, ensuring efficient package management through a monorepo setup with Lerna. I’m also familiar with full-stack development using Javascript, Typescript, HTML/CSS, Svelte, and Python. Beyond development, I’ve designed and prototyped interfaces using Figma, showcasing my ability to take projects from concept to execution.</p> 
          <br/> 
          <p>My interests also extend to competitive hackathons, where I’ve applied my knowledge in fields like blockchain technology, cybersecurity, and reverse engineering. With hands-on experience in developing dApps, real-time dashboards, and browser extensions, I consider myself a versatile developer eager to learn and take on new challenges.</p>
        </div>
      </div>
    </div>
  );
}
