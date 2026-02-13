import { IconType } from 'react-icons';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiBootstrap,
  SiTailwindcss,
  SiIonic,
  SiPhp,
  SiDotnet,
  SiCodeigniter,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiKubernetes,
  SiAdobexd,
  SiAdobephotoshop,
  SiFigma,
  SiGit,
  SiGithub,
  SiPostman,
  SiOpenai,
  SiClaude,
  SiGooglegemini,
} from 'react-icons/si';
import { VscAzure, VscAzureDevops, VscCode } from 'react-icons/vsc';

export interface Skill {
  name: string;
  icon: IconType;
  category: string;
  proficiency: number; // 1-100
}

export const skills: Skill[] = [
  // Frontend
  { name: 'HTML5', icon: SiHtml5, category: 'Frontend', proficiency: 95 },
  { name: 'CSS3', icon: SiCss3, category: 'Frontend', proficiency: 95 },
  { name: 'JavaScript', icon: SiJavascript, category: 'Frontend', proficiency: 95 },
  { name: 'TypeScript', icon: SiTypescript, category: 'Frontend', proficiency: 90 },
  { name: 'React', icon: SiReact, category: 'Frontend', proficiency: 90 },
  { name: 'Next.js', icon: SiNextdotjs, category: 'Frontend', proficiency: 85 },
  { name: 'Angular', icon: SiAngular, category: 'Frontend', proficiency: 90 },
  { name: 'Bootstrap', icon: SiBootstrap, category: 'Frontend', proficiency: 90 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Frontend', proficiency: 85 },
  { name: 'Ionic', icon: SiIonic, category: 'Frontend', proficiency: 90 },

  // Backend
  { name: 'PHP', icon: SiPhp, category: 'Backend', proficiency: 95 },
  { name: 'C#', icon: SiDotnet, category: 'Backend', proficiency: 85 },
  { name: 'CodeIgniter', icon: SiCodeigniter, category: 'Backend', proficiency: 90 },
  { name: 'Node.js', icon: SiNodedotjs, category: 'Backend', proficiency: 85 },
  { name: 'Express', icon: SiExpress, category: 'Backend', proficiency: 85 },
  { name: 'Azure Functions', icon: VscAzure, category: 'Backend', proficiency: 85 },
  { name: 'MySQL', icon: SiMysql, category: 'Backend', proficiency: 90 },
  { name: 'PostgreSQL', icon: SiPostgresql, category: 'Backend', proficiency: 80 },
  { name: 'MongoDB', icon: SiMongodb, category: 'Backend', proficiency: 85 },

  // Cloud & DevOps
  { name: 'Azure', icon: VscAzureDevops, category: 'Cloud', proficiency: 85 },
  { name: 'Kubernetes', icon: SiKubernetes, category: 'Cloud', proficiency: 80 },

  // Design & Tools
  { name: 'Adobe XD', icon: SiAdobexd, category: 'Design', proficiency: 90 },
  { name: 'Photoshop', icon: SiAdobephotoshop, category: 'Design', proficiency: 85 },
  { name: 'Figma', icon: SiFigma, category: 'Design', proficiency: 85 },
  { name: 'Git', icon: SiGit, category: 'Tools', proficiency: 90 },
  { name: 'GitHub', icon: SiGithub, category: 'Tools', proficiency: 90 },
  { name: 'VS Code', icon: VscCode, category: 'Tools', proficiency: 95 },
  { name: 'Postman', icon: SiPostman, category: 'Tools', proficiency: 85 },


  // AI
  { name: 'ChatGPT', icon: SiOpenai, category: 'AI', proficiency: 90 },
  { name: 'Claude', icon: SiClaude, category: 'AI', proficiency: 90 },
  { name: 'Gemini', icon: SiGooglegemini, category: 'AI', proficiency: 85 },
];

export const skillCategories = ['Frontend', 'Backend', 'Cloud', 'Design', 'Tools', 'AI'];
