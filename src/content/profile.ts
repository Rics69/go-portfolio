// Single source of truth for everything the site says about Danil.
// Copy lives here so sections stay purely presentational.

export const profile = {
  name: "Данил Клементьев",
  shortName: "Данил К.",
  firstName: "Данил",
  role: "Go backend-разработчик",
  roleEn: "Go Backend Developer",
  city: "Казань",
  timeZone: "Europe/Moscow",
  status: "Открыт к предложениям",
  tagline: ["4 года в коммерческой разработке.", "3 года на Go.", "Казань."],
  heroWords: ["быстрее", "надёжнее", "понятнее"],
  about:
    "Go backend-разработчик с четырьмя годами коммерческой разработки. До бэкенда занимался фронтендом и проектами полного цикла, поэтому понимаю, как frontend, backend, дизайн и инфраструктура работают вместе. Проектирую микросервисы, работал в продуктовых и заказных командах, декомпозирую бизнес-требования и ставлю задачи.",
  contacts: {
    email: "danil.klementev.29@gmail.com",
    telegram: "sstarweb",
    github: "Rics69",
  },
} as const;

export const links = {
  email: `mailto:${profile.contacts.email}`,
  telegram: `https://t.me/${profile.contacts.telegram}`,
  github: `https://github.com/${profile.contacts.github}`,
  source: "https://github.com/Rics69/go-portfolio",
} as const;

export type Metric = {
  // Digits roll like an odometer; any other characters stay static.
  value: string;
  unit?: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: "4", unit: "года", label: "в коммерческой разработке, из них 3 — на Go" },
  { value: "2×", label: "быстрее API после переписывания с Python на Go" },
  { value: "+40%", label: "пропускной способности после профилирования" },
  { value: "<1%", label: "потерянных сообщений в очереди уведомлений" },
];

export type AdvantageIcon = "gauge" | "shield" | "layers" | "puzzle" | "check" | "mic";

export type Advantage = {
  icon: AdvantageIcon;
  title: string;
  text: string;
};

export const advantagesLead = {
  title: "Измеряю результат, а не обещаю его",
  text: "Каждое изменение подтверждаю цифрами: профилирую через pprof, пишу бенчмарки, считаю потери и покрытие. Поэтому в моём опыте не «оптимизировал», а «ускорил в 2 раза».",
};

export const advantages: Advantage[] = [
  {
    icon: "gauge",
    title: "Производительность",
    text: "pprof и бенчмарки: −130 мс к среднему ответу API и +40% к пропускной способности.",
  },
  {
    icon: "shield",
    title: "Надёжность",
    text: "Retry-механизм и dead-letter очередь: меньше 1% потерянных событий.",
  },
  {
    icon: "layers",
    title: "Полный цикл",
    text: "Пришёл в backend из фронтенда. Проектирую API, которыми удобно пользоваться клиенту.",
  },
  {
    icon: "puzzle",
    title: "Переиспользование",
    text: "Общий gRPC-модуль авторизации для 4 проектов — на 30% быстрее старт нового сервиса.",
  },
  {
    icon: "check",
    title: "Тесты",
    text: "testify и ~70% покрытия критичных модулей — меньше багов в продакшене.",
  },
  {
    icon: "mic",
    title: "Выступления",
    text: "Представил проект микросервисов на технологической конференции «Технократия».",
  },
];

export type CaseTone = "accent" | "light" | "dark" | "muted";
export type CaseViz = "latency" | "queue" | "hub" | "contract";

export type Case = {
  id: string;
  tone: CaseTone;
  viz: CaseViz;
  label: string;
  title: string;
  text: string;
  metrics: string[];
  stack: string[];
};

export const cases: Case[] = [
  {
    id: "kfu",
    tone: "accent",
    viz: "latency",
    label: "Сервис практик КФУ · 2024–2025",
    title: "С Python на Go — API в 2 раза быстрее",
    text: "Полный редизайн legacy-сервиса: перенёс backend с FastAPI на Go и спроектировал заявки, профили студентов и отчёты руководителей. Сервис выдерживает пиковый сезон практик для тысяч студентов.",
    metrics: ["~250 → ~120 мс", "+40% RPS", "тысячи студентов"],
    stack: ["Go", "PostgreSQL", "REST", "pprof"],
  },
  {
    id: "finance",
    tone: "light",
    viz: "queue",
    label: "Сервис учёта финансов · 2023–2024",
    title: "Уведомления, которые доходят",
    text: "Микросервис уведомлений на RabbitMQ: новые транзакции, превышение бюджета, напоминания. Retry и dead-letter очередь снизили потери до долей процента. Проект представлен на «Технократии».",
    metrics: ["< 1% потерь", "данные Сбербанка", "«Технократия»"],
    stack: ["Go", "RabbitMQ", "PostgreSQL", "Docker"],
  },
  {
    id: "triotech",
    tone: "dark",
    viz: "hub",
    label: "Triotech · 2025–2026",
    title: "Один модуль авторизации на 4 проекта",
    text: "REST и gRPC API для четырёх коммерческих проектов студии. Вынес авторизацию в переиспользуемый gRPC-модуль, контейнеризировал сервисы и настроил миграции goose.",
    metrics: ["−30% времени на auth", "~70% покрытия", "окружение за 15 мин"],
    stack: ["Go", "gRPC", "PostgreSQL", "Docker Compose"],
  },
  {
    id: "dst",
    tone: "muted",
    viz: "contract",
    label: "Дст-Урал · 2022–2024",
    title: "Фронтенд, который работает в продакшене",
    text: "Переработал frontend интернет-магазина на Next.js: каталог, корзина, оформление заказа, адаптивная вёрстка. Этот опыт — причина, почему мои API удобны клиентам.",
    metrics: ["редизайн UI/UX", "в продакшене", "каталог и корзина"],
    stack: ["Next.js", "React", "REST"],
  },
];

export type Commit = {
  hash: string;
  period: string;
  company: string;
  role: string;
  head?: boolean;
  lines: { type: string; text: string }[];
};

export const commits: Commit[] = [
  {
    hash: "a1f3c9e",
    period: "май 2025 — июль 2026",
    company: "Triotech",
    role: "Golang-разработчик",
    head: true,
    lines: [
      { type: "feat", text: "REST и gRPC API для 4 коммерческих проектов" },
      { type: "feat", text: "переиспользуемый gRPC-модуль авторизации, −30% времени" },
      { type: "feat", text: "Telegram-бот с интеграцией к REST API проекта" },
      { type: "test", text: "~70% покрытия критичных модулей (testify)" },
      { type: "chore", text: "миграции PostgreSQL на goose во всех проектах" },
      { type: "build", text: "Docker и Compose: окружение за ~15 минут вместо часов" },
    ],
  },
  {
    hash: "7c2d1b4",
    period: "авг 2024 — июль 2025",
    company: "Сервис практик КФУ",
    role: "Golang-разработчик",
    lines: [
      { type: "refactor", text: "backend с Python/FastAPI на Go: ~250 → ~120 мс" },
      { type: "feat", text: "заявки на практику, профили студентов, отчёты" },
      { type: "perf", text: "бенчмарки и pprof: +40% пропускной способности" },
    ],
  },
  {
    hash: "3e9a0f2",
    period: "авг 2023 — июль 2024",
    company: "Сервис учёта финансов",
    role: "Golang-разработчик",
    lines: [
      { type: "feat", text: "микросервис уведомлений на RabbitMQ" },
      { type: "fix", text: "retry и dead-letter очередь: потери < 1%" },
      { type: "feat", text: "интеграция банковских данных Сбербанка" },
      { type: "docs", text: "проект представлен на конференции «Технократия»" },
    ],
  },
  {
    hash: "0b5e8d1",
    period: "сен 2022 — май 2024",
    company: "Дст-Урал",
    role: "Frontend-разработчик",
    lines: [
      { type: "feat", text: "редизайн интернет-магазина на Next.js" },
      { type: "feat", text: "каталог, корзина и оформление заказа" },
    ],
  },
];

export type Module = {
  name: string;
  comment?: string;
  usedIn?: string[];
};

export const goMod: { title: string; modules: Module[]; indirect?: boolean }[] = [
  {
    title: "core",
    modules: [
      { name: "go", comment: "основной язык", usedIn: ["Triotech", "КФУ", "Финансы"] },
      { name: "postgresql", comment: "SQL, миграции goose", usedIn: ["Triotech", "КФУ", "Финансы"] },
      { name: "grpc", comment: "межсервисное API, auth-модуль", usedIn: ["Triotech"] },
      { name: "rest-api", comment: "HTTP, Postman", usedIn: ["Triotech", "КФУ"] },
      { name: "rabbitmq", comment: "retry, dead-letter queue", usedIn: ["Финансы"] },
      { name: "kafka" },
      { name: "redis" },
      { name: "elasticsearch" },
      { name: "websocket" },
    ],
  },
  {
    title: "tools",
    modules: [
      { name: "docker", comment: "Dockerfile, compose", usedIn: ["Triotech", "Финансы"] },
      { name: "kubernetes" },
      { name: "testify", comment: "~70% покрытия", usedIn: ["Triotech", "Финансы"] },
      { name: "pprof", comment: "профилирование, бенчмарки", usedIn: ["КФУ"] },
      { name: "git" },
    ],
  },
  {
    title: "indirect",
    indirect: true,
    modules: [
      { name: "nextjs", comment: "фронтенд-бэкграунд", usedIn: ["Дст-Урал", "КФУ"] },
      { name: "scrum", comment: "agile, декомпозиция задач" },
    ],
  },
];

export const education = [
  {
    year: "2026",
    title: "Казанский федеральный университет",
    text: "Бакалавр, программная инженерия. Институт ИТИС.",
  },
  {
    year: "2025",
    title: "Академия бэкенда Т-Банка",
    text: "Backend-разработка: Java и Spring Boot.",
  },
  {
    year: "2024",
    title: "AGONA, Технократия",
    text: "Backend-разработка: Java и Spring Boot.",
  },
];

// Served as JSON at /api/v1/me and printed by the hero terminal.
export const apiProfile = {
  name: profile.name,
  role: profile.roleEn,
  location: "Kazan, UTC+3",
  experience_years: 4,
  stack: ["Go", "PostgreSQL", "gRPC", "RabbitMQ", "Docker"],
  highlights: {
    api_latency: "250ms -> 120ms",
    throughput: "+40%",
    message_loss: "<1%",
  },
  open_to_work: true,
};
