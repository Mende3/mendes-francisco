import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  Bot,
  ChevronDown,
  Code,
  ExternalLink,
  FileUser,
  Loader2,
  Eye,
  Menu,
  Moon,
  Send,
  Sun,
  X,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineArchitecture } from "react-icons/md";
import { TbApi, TbBrandLinktree } from "react-icons/tb";
import { supabase } from "./lib/supabase";
import foto from "./assets/profile3.jpeg";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  project_link: string | null;
  tech_used?: string[];
}

const EMAIL = "mendesfrancisco172004@gmail.com";

const RESUME_URL =
  "https://pub-8549ba9388f347258fc8a264b4eb85c9.r2.dev/files/resumo-mendes-francisco.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/mendes-francisco-4a1166368/";
const LINKTREE_URL = "https://linktr.ee/mendesfrancisco172004";
const GITHUB_URL = "https://github.com/Mende3";
const CV_URL =
  "https://pub-8549ba9388f347258fc8a264b4eb85c9.r2.dev/files/cv-mendes-francisco.pdf";

type Language = "pt" | "en";

const serviceIcons = [BarChart3, Code, MdOutlineArchitecture, Bot, TbApi];

const translations = {
  pt: {
    nav: ["Home", "Sobre", "Projetos", "Serviços", "CV"],
    contact: "Entre em contacto",
    role: "Engenheiro de software",
    hero: "Com experiência em ciência de dados, fullstack, automação e sysadmin",
    contactAction: "Entre em contacto",
    aboutTitle: "Sobre Mim",
    aboutSubtitle: "Minha Jornada",
    about: "Profissional de tecnologia versátil, formado pela Escola 42 Luanda, com uma trajetória construída sobre bases sólidas de programação de sistemas e engenharia backend. Atua como desenvolvedor full-stack, automatizador e administrador de sistemas (sysadmin), reunindo uma visão de produto de ponta a ponta, da infraestrutura ao código que chega ao utilizador final.",
    resume: "Ver o resumo",
    servicesTitle: "O que eu faço",
    servicesSubtitle: "Conheça os meus serviços",
    projectsTitle: "Projetos",
    projectsSubtitle: "Alguns dos meus projetos",
    loading: "A carregar projetos...",
    errorTitle: "Algo correu mal",
    error: "Não foi possível carregar os projetos. Tente novamente mais tarde.",
    openProject: "Abrir projeto",
    technologies: "Tecnologias usadas",
    allProjects: "Ver todos os projetos públicos no GitHub",
    contactTitle: "Entre em contacto",
    contactSubtitle: "Vamos trabalhar juntos",
    name: "Nome",
    fullName: "nome completo",
    email: "Email",
    service: "Serviço",
    chooseService: "Selecione um serviço",
    message: "Mensagem",
    send: "Enviar",
    footer: "Vamos",
    footerSecond: "Trabalhar juntos!",
    viewCv: "Visualizar CV",
    rights: "todos os direitos reservados.",
    services: [
      ["Análise de dados", "Exploro dados e pratico conceitos de data science com ferramentas do Google e da Microsoft."],
      ["Programação intensiva", "Construo software com bases sólidas de programação de sistemas e engenharia backend."],
      ["Arquiteto de soluções", "Desenho estruturas técnicas e recomendo ferramentas que respondem aos objetivos do projeto."],
      ["Agentes de IA", "Criação de agentes de IA e integração de ferramentas."],
      ["Desenvolvimento e integração de APIs", "Desenvolvo APIs em NestJS e FastAPI e integro serviços de terceiros."],
    ],
  },
  en: {
    nav: ["Home", "About", "Projects", "Services", "Resume"],
    contact: "Get in touch",
    role: "Software engineer",
    hero: "Experienced in data science, fullstack development, automation and sysadmin",
    contactAction: "Get in touch",
    aboutTitle: "About Me",
    aboutSubtitle: "My Journey",
    about: "Versatile technology professional, trained at 42 Luanda, with a path built on strong foundations in systems programming and backend engineering. I work as a full-stack developer, automation builder and systems administrator, bringing an end-to-end product perspective from infrastructure to the final user experience.",
    resume: "View summary",
    servicesTitle: "What I do",
    servicesSubtitle: "Explore my services",
    projectsTitle: "Projects",
    projectsSubtitle: "Some of my projects",
    loading: "Loading projects...",
    errorTitle: "Something went wrong",
    error: "Unable to load the projects. Please try again later.",
    openProject: "Open project",
    technologies: "Technologies used",
    allProjects: "View all public projects on GitHub",
    contactTitle: "Get in touch",
    contactSubtitle: "Let's work together",
    name: "Name",
    fullName: "full name",
    email: "Email",
    service: "Service",
    chooseService: "Choose a service",
    message: "Message",
    send: "Send",
    footer: "Let's",
    footerSecond: "Work together!",
    viewCv: "View CV",
    rights: "all rights reserved.",
    services: [
      ["Data analysis", "I explore data and practice data science concepts with Google and Microsoft tools."],
      ["Intensive programming", "I build software on strong foundations in systems programming and backend engineering."],
      ["Solution architecture", "I design technical structures and recommend tools that answer each project's goals."],
      ["AI agents", "Creation of AI agents and tool integrations."],
      ["API development and integration", "I build APIs with NestJS and FastAPI and integrate third-party services."],
    ],
  },
} as const;

const filters = [
  "Machine learning",
  "Sql",
  "Power BI",
  "ALLMs",
  "Spatial Data Science",
];
const skills = [
  "C/C++/C#/Python/JS/TS",
  "langChain/langGraph",
  "IA/PromptEnginer",
  "Redis",
  "Postgres/MongoDB/MySQL",
  "airflow/n8n",
  "React",
  "Supabase",
  "Prisma",
  "NestJS/FastAPI",
  "Node",
  "BI",
  "Docker",
  "meltano/dbt/metabase",
];
// const fallbackTechnologies = [
//   [
//     "Docker",
//     "Nestjs-Microservices",
//     "Postgres",
//     "RabbitMQ",
//     "Redis",
//     "Grafana/prometheus",
//     "n8n",
//     "LMM/IA",
//     "Recat",
//     "cloudflare",
//   ],
//   ["React", "Supabase"],
//   ["Python", "Meltano", "uv"],
// ];
function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Machine learning");
  const [language, setLanguage] = useState<Language>("pt");
  const copy = translations[language];

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, error: queryError } = await supabase
          .from("projects_pfl")
          .select(
            "id, title, description, image_url, project_link, priority, tech_used",
          )
          .order("priority", { ascending: false })
          .order("created_at", { ascending: false });

        if (queryError) throw queryError;
        setProjects(data ?? []);
      } catch (err) {
        setError("project_error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Serviço-portofólio (${form.subject})` || `Contacto de ${form.name}`,
    );
    const body = encodeURIComponent(
      `Nome: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className={dark ? "app dark" : "app light"}>
      <header className="site-header">
        <a className="brand" href="#top" onClick={() => scrollTo("top")}>
          Mendes
        </a>
        <nav
          className={menuOpen ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
        >
          {copy.nav.map((item, index) => (
            <button
              key={item}
              className={index === 0 ? "active" : ""}
              onClick={() => scrollTo(["top", "sobre", "projetos", "serviços", "contact"][index])}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-switcher" aria-label="Choose language">
            {(["en", "pt"] as Language[]).map((option) => (
              <button key={option} className={language === option ? "active" : ""} onClick={() => setLanguage(option)} aria-pressed={language === option}>{option}</button>
            ))}
          </div>
          <button
            className="outline-button header-contact"
            onClick={() => scrollTo("contact")}
          >
            {copy.contact}
          </button>
          <button
            className="theme-button"
            aria-label="Toggle color theme"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            className="menu-button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-orbit" />
          <div className="avatar">
            <img src={foto} alt="" />
          </div>
          <h1>Mendes Francisco</h1>
          <p className="hero-role">{copy.role}</p>
          <p className="hero-copy">{copy.hero}</p>
          <div className="filter-row">
            {skills.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "filter active" : "filter"}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <button
            className="primary-button"
            onClick={() => scrollTo("contact")}
          >
            {copy.contactAction}
            <ArrowUpRight size={14} />
          </button>
        </section>

        <section className="about content-section" id="sobre">
          <SectionHeading title={copy.aboutTitle} subtitle={copy.aboutSubtitle} />
          <div className="about-copy">
            <p>{copy.about}</p>
            <p>...</p>
          </div>
          <a href={RESUME_URL} target="_blank">
            <button className="outline-button resume-button">
              <Eye size={13} /> {copy.resume}
            </button>
          </a>
        </section>

        <section className="services content-section" id="serviços">
          <SectionHeading
            title={copy.servicesTitle}
            subtitle={copy.servicesSubtitle}
          />
          <div className="services-grid">
            {copy.services.map(([title, text], index) => {
              const Icon = serviceIcons[index];
              return <article className="service-card" key={title}>
                <div className="flex gap-2">
                  <div className="service-icon">
                    <Icon size={14} />
                  </div>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>;
            })}
            <div className="service-image">
              <div className="network-art">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </section>

        <section className="projects content-section" id="projetos">
          <SectionHeading
            title={copy.projectsTitle}
            subtitle={copy.projectsSubtitle}
          />

          <div className="filter-row">
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "filter active" : "filter"}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-neon-500 animate-spin" />
              <p className="text-sm text-gray-500 font-mono">
                {copy.loading}
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="glass-card p-8 flex items-start gap-4 max-w-2xl">
              <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">
                  {copy.errorTitle}
                </h3>
                <p className="text-sm text-gray-400">{copy.error}</p>
              </div>
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <>
              <div className="projects-grid">
                {projects.map((project) => {
                  const technologies = project?.tech_used;
                  return (
                    <article className="project-card" key={project.id}>
                      <a
                        className="project-link"
                        href={project.project_link ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Abrir ${project.title}`}
                      >
                        <div className="project-image">
                          <img
                            src={project.image_url ?? undefined}
                            alt={`Pré-visualização de ${project.title}`}
                          />
                          <span className="project-overlay">
                            <ExternalLink size={15} />
                            <span>{copy.openProject}</span>
                          </span>
                        </div>
                      </a>
                      <div className="project-meta">
                        <div className="project-copy">
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                        </div>
                        <a
                          className="project-arrow"
                          href={project.project_link ?? "#"}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Abrir ${project.title}`}
                        >
                          <ArrowUpRight size={13} />
                        </a>
                      </div>
                      <div
                        className="project-technologies"
                        aria-label={copy.technologies}
                      >
                        {technologies?.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}

          <a className="outline-button view-button" href="https://github.com/Mende3" target="_blank" rel="noreferrer">
            {copy.allProjects}
            <ArrowUpRight size={13} />
          </a>
        </section>

        <section className="contact content-section" id="contact">
          <SectionHeading
            title={copy.contactTitle}
            subtitle={copy.contactSubtitle}
          />
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              {copy.name}
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={copy.fullName}
                required
              />
            </label>
            <label>
              {copy.email}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="exemplo@email.com"
                required
              />
            </label>
            {/*  */}
            <label>
              {copy.service}
              <div className="select-wrap">
                <select defaultValue="" name="subject" onChange={handleChange}>
                  <option value="" disabled>
                    {copy.chooseService}
                  </option>
                  <option value="Data analytics">Data analytics</option>
                  <option value="Backend">Backend</option>
                  <option value="Uso de IA">Uso de IA</option>
                  <option value="Automações">Automações</option>
                  <option value="Sys Admin">Sys Admin</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Outro">Outro</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </label>
            <label>
              {copy.message}
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </label>
            <button className="submit-button" type="submit">
              <Send size={13} />
              {copy.send}
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <h2>
            {copy.footer}
            <br />
            {copy.footerSecond}
          </h2>
          <a className="email-pill" href={CV_URL} target="_blank">
            <FileUser size={14} />
            {copy.viewCv}
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {copy.rights}</span>
          {/*  */}
          <div className="socials">
            <a href={LINKEDIN_URL} aria-label="LinkedIn" target="_blanck">
              <FaLinkedin size={13} />
            </a>
            <a href={GITHUB_URL} aria-label="Github" target="_blanck">
              <FaGithub size={13} />
            </a>
            <a href={LINKTREE_URL} aria-label="LinkTree" target="_blank">
              <TbBrandLinktree size={13} />
            </a>
            <a href="#top" aria-label="Back to top">
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <span>{subtitle}</span>
    </div>
  );
}

export default App;
