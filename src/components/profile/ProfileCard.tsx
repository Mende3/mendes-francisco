
import { SiGithub, SiWhatsapp } from '@icons-pack/react-simple-icons'
import { Award, Star, User } from 'lucide-react'
import { CiLinkedin } from 'react-icons/ci'
import profileImg from '../../assets/profile2.jpeg'

interface AvatarProps {
  src?: string
  alt: string
  fallbackText: string
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, fallbackText }) => (
  <div className="relative w-full overflow-hidden">
    {src ? (
      <img src={src} alt={alt} className="w-full object-contain object-bottom" />
    ) : (
      <div className="flex h-64 w-full items-center justify-center bg-muted">
        <span className="text-4xl text-foreground/30">{fallbackText}</span>
      </div>
    )}
  </div>
)

const creatorData = {
  name: 'Mendes Francisco',
  title: 'Backend Dev & CTO · Mukanda',
  avatarAlt: 'Mendes Francisco',
  fallbackText: 'M',
  bio: [
    'Desenvolvedor backend, automatizador e sysadmin formado na Escola 42 Luanda, com foco em arquitectura backend, automação com IA e segurança de aplicações.',
    'Co-fundador e CTO do Mukanda, uma plataforma SaaS de atendimento ao cliente via WhatsApp com IA, pensada para PMEs angolanas.',
  ],
  quote:
    'Acredito que tecnologia bem construída pode transformar mercados emergentes. Angola tem potencial e estou aqui para ajudar a construir isso.',
}

const socialLinks = [
  {
    href: 'https://github.com/mende3',
    label: 'GitHub',
    icon: <SiGithub className="h-5 w-5 text-primary" />,
  },
  {
    href: 'https://wa.me/244936854246',
    label: 'WhatsApp',
    icon: <SiWhatsapp className="h-5 w-5 text-primary" />,
  },
  {
    href: 'www.linkedin.com/in/mendes-francisco-4a1166368',
    label: 'LinkedIn',
    icon: <CiLinkedin className="h-5 w-5 text-primary" />,
  },
]

const highlights = [
  {
    icon: <User className="h-6 w-6 text-primary" />,
    title: 'CTO & Co-founder',
    subtitle: 'Mukanda',
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: 'Formado em',
    subtitle: 'Escola 42 Luanda',
  },
  {
    icon: <Star className="h-6 w-6 text-primary" />,
    title: 'Baseado em',
    subtitle: 'Luanda, Angola',
  },
]

const CreatorProfile = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">

        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Me <span className="text-blue-600">conheça</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Bem-vindo ao meu portfólio. Aqui encontras os projectos que construí,
            as tecnologias que domino e um pouco sobre quem sou. Fique à vontade
            para explorar e entrar em contacto se algo despertar interesse.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-lg border border-border backdrop-blur-lg py-1 shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-7">

            {/* Esquerda — foto + nome + links */}
            <div className="flex flex-col items-center border-r border-border backdrop-blur-lg py-1 md:col-span-2">
              <Avatar
                src={profileImg}
                alt={creatorData.avatarAlt}
                fallbackText={creatorData.fallbackText}
              />
              <div className="flex flex-col items-center p-4 gap-2 w-full">
                <h3 className="text-center text-xl font-bold text-foreground">
                  {creatorData.name}
                </h3>
                <p className="text-center text-sm text-primary">{creatorData.title}</p>
                <div className="flex gap-4 mt-2">
                  {socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      aria-label={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-70"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Direita — bio + highlights + quote */}
            <div className="p-6 md:col-span-5 md:p-8">
              <div className="mb-6">
                <h4 className="mb-3 text-xl font-semibold text-blue-600">
                  Sobre o {creatorData.name.split(' ')[0]}
                </h4>
                {creatorData.bio.map((para, idx) => (
                  <p key={idx} className="mb-4 text-gray-600">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 rounded-md bg-[#F4F4F4] p-3"
                  >
                    {item.icon}
                    <div>
                      <p className="text-sm font-medium text-gray-700">{item.title}</p>
                      <p className="text-sm text-indigo-500">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-foreground/50 italic">{creatorData.quote}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default CreatorProfile

