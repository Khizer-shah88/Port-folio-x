import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Khizer",
  lastName: "Shah",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full-Stack Developer",
  avatar: "/images/avatar.jpg",
  location: "Asia/Islamabad", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English",], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in src/once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Khizer-shah88",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/khizer-shah-418744355",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:khizershah493@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Full Stack Developer and Engineer.</>,
  subline: (
    <>
      I'm Khizer, a full stack engineer , where I craft intuitive
      <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Iam  a full-stack developer, DevOps engineer, and UI designer focused on shipping polished,
        scalable products. I builds modern web apps, automates deployment workflows, and shapes interfaces
        that stay fast, accessible, and intuitive across devices.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "_",
        timeframe: "2023 - Present",
        role: "Senior Full-Stack Developer/DevOps Engineer",
        achievements: [
          <>
            Architected and deployed full-stack applications using Next.js, Node.js, and PostgreSQL with Prisma ORM,
            resulting in faster query performance and clearer system scalability.
          </>,
          <>
            Implemented CI/CD pipelines and containerized applications using Docker and Kubernetes on AWS,
            reducing deployment time and manual release work.
          </>,
          <>
            Integrated Firebase and Supabase for real-time data synchronization, enabling seamless user experiences
            across web and mobile platforms.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "DevOps dashboard",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Full-Stack Developer and UI Engineer",
        achievements: [
          <>
            Built backend services using NestJS and optimized PostgreSQL databases, improving API response times and reliability.
          </>,
          <>
            Shipped responsive UI layers and design-system-driven interfaces that kept product behavior consistent
            across desktop and mobile screens.
          </>,
          <>
            Managed IoT device integrations using ESP8266/ESP32 modules with cloud connectivity, enabling real-time
            data collection and monitoring.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Responsive UI system",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "IUB",
        description: <>Studied Software Engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Backend & Database",
        description: <>NestJS, Node.js, PostgreSQL, Prisma ORM, Firebase, Supabase.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Backend & Database",
          },
        ],
      },
      {
        title: "Frontend & UI",
        description: <>React, Next.js, TypeScript, Tailwind CSS, accessibility, and responsive design.</>,
        images: [
          {
            src: "/images/cover.png",
            alt: "Frontend and UI design",
          },
        ],
      },
      {
        title: "DevOps & Cloud",
        description: <>AWS (EC2, S3, RDS, Lambda), Docker, Kubernetes, CI/CD pipelines, GitHub Actions.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "DevOps & Cloud",
          },
        ],
      },
      {
        title: "UI Design",
        description: <>Figma, design systems, prototypes, wireframes, and handoff-ready UI specs.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "UI Design",
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export { person, social, newsletter, home, about, blog, work };
