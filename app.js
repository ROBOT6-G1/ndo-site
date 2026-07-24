const DEFAULT_COMPANY_SETTINGS = {
  companyName: 'Apex Tech Solutions',
  heroTitle: 'Fiara-miasa sy Vahaolana Teknolojika Avo Lenta ho an\'ny Oram-panjakana sy Vondron\'asa',
  heroSub: 'Manampy anao amin\'ny fanatsarana sy fanafainganana ny tetikasanao amin\'ny alalan\'ny teknolojia maoderina sy serivisy matihanina.',
  aboutTitle: 'Empowering Businesses Across Madagascar',
  aboutText: 'Apex Tech Solutions dia orinasa mpitarika amin\'ny fampandrosoana sy fanavaozana ara-teknolojia. Izahay dia manolotra vahaolana mifanaraka amin\'ny filàn\'ny tsirairay.',
  phone: '+261 34 00 123 45',
  email: 'contact@apextech.mg',
  address: 'Immeuble Vision, Ankorondrano, Antananarivo 101',
  heroBanner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  adminPassword: '1234'
};

const DEFAULT_SERVICES = [
  {
    id: 'srv-1',
    title: 'Transformations Digitales',
    icon: '💻',
    description: 'Fandaminana sy fampivoarana ny rafitra ara-teknolojia ao amin\'ny orinasanao ho matihanina.',
    features: ['Audit IT', 'Cloud Migration', 'Cybersecurity']
  },
  {
    id: 'srv-2',
    title: 'Fampivoarana Software & Web',
    icon: '⚡',
    description: 'Famoronana tranonkala, application mobile sy logiciel ara-potoana mifanaraka amin\'ny asa.',
    features: ['React & Node.js', 'Mobile iOS/Android', 'API Integration']
  },
  {
    id: 'srv-3',
    title: 'Mpanolotsaina sy Audit (Consulting)',n    icon: '📊',
    description: 'Torohay sy tantsoroka avo lenta amin\'ny fitantanana tetikasa sy fampiasam-bola teknolojika.',
    features: ['Strategy Consulting', 'Risk Management', 'Training']
  }
];

const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Banky Maoderina Digital Portal',
    category: 'Finance & Cloud',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    description: 'Modernisation sy fampifandraisana ny rafitra banking en ligne amin\'ny alalan\'ny Cloud.'
  },
  {
    id: 'proj-2',
    title: 'Application Mobile E-Santé',
    category: 'Santé & Tech',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    description: 'Vahaolana famandrihana fotoana sy fizahana ara-pahasalamana lavitra (Télémédecine).'
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Ranaivo Jean-Marc',
    role: 'Directeur Général, Mada Distribution',
    comment: 'Nahafa-po indrindra ny fiaraha-miasa tamin\'i Apex Tech. Niakatra 40% ny fahombiazana vokatry ny rafitra vaovao.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't-2',
    name: 'Rasoloarisoa Mireille',
    role: 'Responsable Opérationnel, BTP Group',
    comment: 'Matihanina amin\'ny fotoana sy ny kalitao. Tsy misy mampahatahotra amin\'ny tetikasa lehibe.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
];

const DEFAULT_TEAM = [
  {
    id: 'team-1',
    name: 'Andry Rakoto',
    role: 'Fondateur & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'team-2',
    name: 'Aina Randria',
    role: 'Chief Technology Officer (CTO)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  }
];

const DEFAULT_FAQS = [
  {
    id: 'faq-1',
    question: 'Ahoana ny fomba fifandraisana ho an\'ny tetikasa vaovao?',
    answer: 'Azonao atao ny mameno ny formulaire ao amin\'ny pejy Contact na miantso anay mivantana amin\'ny telefonina.'
  },
  {
    id: 'faq-2',
    question: 'Manao devis maimaim-poana ve i Apex Tech?',
    answer: 'Eny, maimaim-poana 100% ny fanaovana devis sy ny fandalinana voalohany ny filànan\'ny orinasanao.'
  }
];

async function getCompanySettings() {
  if (db) {
    try {
      const doc = await db.collection('company_settings').doc('general').get();
      if (doc.exists) return { ...DEFAULT_COMPANY_SETTINGS, ...doc.data() };
    } catch(e) { console.warn(e); }
  }
  const local = localStorage.getItem('apex_company_settings');
  return local ? { ...DEFAULT_COMPANY_SETTINGS, ...JSON.parse(local) } : DEFAULT_COMPANY_SETTINGS;
}

async function renderCompanyUI() {
  const settings = await getCompanySettings();
  
  document.querySelectorAll('.cms-company-name').forEach(el => el.textContent = settings.companyName);
  document.querySelectorAll('.cms-phone').forEach(el => el.textContent = settings.phone);
  document.querySelectorAll('.cms-email').forEach(el => el.textContent = settings.email);
  document.querySelectorAll('.cms-address').forEach(el => el.textContent = settings.address);

  const elHeroTitle = document.getElementById('cms-hero-title');
  const elHeroSub = document.getElementById('cms-hero-sub');
  const elHeroBanner = document.getElementById('cms-hero-banner');
  const elAboutText = document.getElementById('cms-about-text');

  if (elHeroTitle) elHeroTitle.textContent = settings.heroTitle;
  if (elHeroSub) elHeroSub.textContent = settings.heroSub;
  if (elHeroBanner && settings.heroBanner) elHeroBanner.src = settings.heroBanner;
  if (elAboutText) elAboutText.textContent = settings.aboutText;
}

async function submitContactForm(e) {
  e.preventDefault();
  const name = document.getElementById('cntName').value;
  const email = document.getElementById('cntEmail').value;
  const phone = document.getElementById('cntPhone').value;
  const subject = document.getElementById('cntSubject').value;
  const message = document.getElementById('cntMessage').value;

  const msgObj = {
    name, email, phone, subject, message, date: new Date().toLocaleString('fr-FR'), status: 'Vaovao'
  };

  if (db) {
    try { await db.collection('contact_messages').add(msgObj); } catch(err) { console.error(err); }
  }
  const list = JSON.parse(localStorage.getItem('apex_messages') || '[]');
  list.unshift(msgObj);
  localStorage.setItem('apex_messages', JSON.stringify(list));

  alert('✅ Misaotra tompoko! Voaray ny hafatrao ary hifandray aminao ao anatin\'ny fotoana fohy izahay.');
  e.target.reset();
}

if (db) {
  db.collection('company_settings').doc('general').onSnapshot(() => renderCompanyUI());
}

window.addEventListener('DOMContentLoaded', renderCompanyUI);