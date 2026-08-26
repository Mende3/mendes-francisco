import { useEffect, useState } from 'react';
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
} from 'lucide-react';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdOutlineArchitecture } from 'react-icons/md';
import { TbApi, TbBrandLinktree } from 'react-icons/tb';
import { supabase } from './lib/supabase';
import foto from './assets/profile3.jpeg'

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  project_link: string | null;
}

const EMAIL = "mendesfrancisco172004@gmail.com"

const RESUME_URL = "https://pub-8549ba9388f347258fc8a264b4eb85c9.r2.dev/files/resumo-mendes-francisco.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/mendes-francisco-4a1166368/"
const LINKTREE_URL = "https://linktr.ee/mendesfrancisco172004";
const GITHUB_URL = "https://github.com/Mende3"
const CV_URL = "https://pub-8549ba9388f347258fc8a264b4eb85c9.r2.dev/files/cv-mendes-francisco.pdf";


const services = [
  { icon: BarChart3, title: 'Análise de dados', text: 'Sendo uma area dentro de data science estou dando uma olhada e aprendendo conceitos todos os dias, praticando também com ferramentas do Google e da Microsoft.' },
  { icon: Code, title: 'Programação intensiva', text: 'Uma das características da 42Escola é fazer com que o aluno aprenda a escrever códigos na raça, e comigo não foi diferente.' },
  { icon: MdOutlineArchitecture, title: 'Arquiteto de Soluções ', text: 'Desenho estruturas técnicas, como um EDA e quais Design Patterns usar, recomendo as melhores ferramentas e plaformas e garanto que o sistema ou as escolhas atendem as nessecidades e objetivos.' },
  { icon: Bot, title: 'Agentes de IA', text: 'Criação de agentes de IA e integração de ferramentas.' },
  { icon: TbApi, title: 'Desenvovimento e Integração de API', text: 'Desenvolvo APIs em NestJS e Fastapi(como uma segunda stack), com essas mesmas ferramentas integro APIs de terceiros em sistemas' },
];

const filters = ['Machine learning', 'Sql', 'Power BI', 'ALLMs', 'Spatial Data Science'];
const skills = ['TS/JS', 'C/C++/C#', 'Python', 'langChain/langGraph', 'IA', 'Redis', 'Postgres/MongoDB/MySQL', 'n8n', 'React', 'Supabase', 'Prisma', 'NestJS/FastAP', 'Node', 'BI', 'Docker', 'Prompt Enginer']
function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Machine learning');

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
          .select("id, title, description, image_url, project_link, priority")
          .order("priority", {ascending: false})
          .order("created_at", { ascending: false });

        if (queryError) throw queryError;
        setProjects(data ?? []);
      } catch (err) {
        setError("Não foi possível carregar os projetos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Serviço-portofólio (${form.subject})` || `Contacto de ${form.name}`);
    const body = encodeURIComponent(
      `Nome: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className={dark ? 'app dark' : 'app light'}>
      <header className="site-header">
        <a className="brand" href="#top" onClick={() => scrollTo('top')}>Mendes</a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          {['Home', 'About', 'Projects', 'Services', 'Resume'].map((item) => (
            <button key={item} className={item === 'Home' ? 'active' : ''} onClick={() => scrollTo(item === 'Home' ? 'top' : item.toLowerCase())}>{item}</button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="outline-button header-contact" onClick={() => scrollTo('contact')}>Entre em contacto</button>
          <button className="theme-button" aria-label="Toggle color theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-orbit" />
          <div className="avatar">
            <img src={foto} alt="" />
          </div>
          <h1>Mendes Francisco</h1>
          <p className="hero-role">☆☆☆☆☆</p>
          <p className="hero-copy">Como cientista de dados, backend developer, automatizador e sysadmin apaixonado, com experiência em programação, IA, dados, backend, docker e mais</p>
          <div className="filter-row">{skills.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter active' : 'filter'} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          <button className="primary-button" onClick={() => scrollTo('contact')}>Entre em contato<ArrowUpRight size={14} /></button>

        </section>

        <section className="about content-section" id="about">
          <SectionHeading title="Sobre Mim" subtitle="Minha Jornada" />
          <div className="about-copy">
            <p>Profissional de tecnologia versátil, formado pela Escola 42 Luanda, com uma trajetória construída sobre bases sólidas de programação de sistemas e engenharia backend. Atua como desenvolvedor full-stack, automatizador e administrador de sistemas (sysadmin), reunindo uma visão de produto de ponta a ponta, da infraestrutura ao código que chega ao utilizador final</p>
            <p>...</p>
          </div>
          <a href={RESUME_URL} target='_blank'>
            <button className="outline-button resume-button"><Eye size={13} /> ver o resumo</button>
          </a>
        </section>

        <section className="services content-section" id="services">
          <SectionHeading title="O que eu faço" subtitle="conheça os meus serviços" />
          <div className="services-grid">
            {services.map(({ icon: Icon, title, text }) => (
              <article className="service-card" key={title}>
            <div className='flex gap-2'>
              <div className="service-icon"><Icon size={14} /></div>
            </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
            <div className="service-image"><div className="network-art"><span /><span /><span /><span /><span /><span /></div></div>
          </div>
        </section>

        <section className="projects content-section" id="projects">
          <SectionHeading title="Projetos" subtitle="Alguns dos meus projetos" />
         
          <div className="filter-row">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter active' : 'filter'} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
         
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-neon-500 animate-spin" />
              <p className="text-sm text-gray-500 font-mono">A carregar projetos...</p>
            </div>
          )}

          {error && !loading && (
            <div className="glass-card p-8 flex items-start gap-4 max-w-2xl">
              <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">Algo correu mal</h3>
                <p className="text-sm text-gray-400">{error}</p>
              </div>
            </div>
          )}
          
        {!loading && !error && projects.length > 0 && (
        <>
            <div className="projects-grid">
              {projects.map((project) => <article className="project-card" key={project.id}>
                  <div className="project-image">
                    <img src={project.image_url ?? undefined} alt="Project preview" /><span className="project-overlay"><ExternalLink size={15} /></span>
                  </div>
                  <div className="project-meta">
                    <div><h3>{project.title}</h3><p>{project.description}</p></div><a href={project.project_link || undefined} target='_blank'><button aria-label="Open project"><ArrowUpRight size={13} /></button></a>
                  </div>
              </article>)}
            </div> 
        </>
        )}
        
        
        
          <a href='https://github.com/Mende3' target='_blank'>
            <button className="outline-button view-button">Ver todos projetos públicos no github<ArrowUpRight size={13} /></button>
          </a>
        </section>

        <section className="contact content-section" id="contact">
          <SectionHeading title="Entre em contacto" subtitle="Vamos trabalhar juntos" />
          <form className="contact-form" onSubmit={handleSubmit}> 
            <label>Nome
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="nome completo"
                required
              />
            </label>
            <label>Email
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
            <label>Serviço
              <div className="select-wrap">
                <select defaultValue="" name="subject" onChange={handleChange}>
                  <option value="" disabled>Seleciona um serviço</option>
                  <option value="Data analytics">Data analytics</option>
                  <option value="Backend">Backend</option>
                  <option value="Uso de IA">Uso de IA</option>
                  <option value="Automações">Automações</option>
                  <option value="Sys Admin">Sys Admin</option>
                  <option value="DevOp">DevOp</option>
                  <option value="Outro">Outro</option>
                </select>
                <ChevronDown size={14} />
                </div>
            </label>
            <label>Mensagem
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </label>
            <button className="submit-button" type="submit"><Send size={13} />Enviar</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <h2>Vamos<br />Trabalhar juntos!</h2>
          <a className="email-pill" href={CV_URL} target='_blank'><FileUser size={14} />Visualizar CV</a></div>
        <div className="footer-bottom">
          <span>© 2026 todos direitos reservados.</span>
          {/*  */}
          <div className="socials">
            <a href={LINKEDIN_URL} aria-label="LinkedIn" target='_blanck'><FaLinkedin size={13} /></a>
            <a href={GITHUB_URL} aria-label="Github" target='_blanck'><FaGithub size={13} /></a>
            <a href={LINKTREE_URL} aria-label="LinkTree" target='_blank'><TbBrandLinktree size={13} /></a>
            <a href="#top" aria-label="Back to top"><ArrowUpRight size={13} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="section-heading"><h2>{title}</h2><span>{subtitle}</span></div>;
}

export default App;
