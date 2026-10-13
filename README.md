# go-portfolio

Сайт-портфолио Данила Клементьева, Go backend-разработчика из Казани.

**Сайт:** https://rics69.github.io/go-portfolio/ · **Профиль в JSON:** [`/api/v1/me`](https://rics69.github.io/go-portfolio/api/v1/me)

## Что внутри

- **Hero-клавиатура BACK/END.** Клавиши ведут к разделам, щёлкают (звук синтезируется через Web Audio) и нажимаются с физической клавиатуры. Enter открывает «Связаться».
- **Резюме как API.** Терминал делает настоящий запрос к статическому эндпоинту `/api/v1/me` и показывает реальное время ответа.
- **Цифры барабаном:** «4 года», «2×», «+40%», «<1%».
- **Кейсы с живыми схемами:** гонка запросов Python против Go, очередь RabbitMQ с retry и DLQ, общий gRPC-модуль авторизации, связка JSON → интерфейс.
- **Опыт как `git log --graph`** и **стек как `go.mod`** с интерактивным `go mod why`.
- **Интерактивный терминал** в контактах (`help`, `whoami`, `sudo hire danil`…), модалка «Связаться», приветствие в DevTools с `hire()`.
- Все анимации уважают `prefers-reduced-motion` и останавливаются вне экрана.

## Стек

Next.js 16 (App Router, статический экспорт) · TypeScript · Tailwind CSS v4 · Motion. Шрифты: Onest и JetBrains Mono.

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # статический сайт в out/
```

## Где что менять

| Что | Где |
| --- | --- |
| Весь текст сайта, цифры, кейсы, опыт, стек, контакты | `src/content/profile.ts` |
| Цвета, отступы, шрифты | `src/app/globals.css`, `src/app/layout.tsx` |
| Превью ссылки и иконки | `src/app/opengraph-image.png`, `src/app/icon.svg`, `src/app/apple-icon.png` |
| Секции страницы | `src/components/**` |

## Деплой

Каждый пуш в `main` собирает сайт и публикует его на GitHub Pages (`.github/workflows/deploy.yml`).
Один раз нужно включить Pages: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

План разработки по фазам: [docs/PLAN.md](docs/PLAN.md).
