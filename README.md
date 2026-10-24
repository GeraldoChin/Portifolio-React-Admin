# React + Vite

## API NestJS, PostgreSQL, Prisma e Cloudinary

A API fica em `backend/`. O site React pode ser publicado na Vercel; publique a API NestJS e o PostgreSQL na Railway. As imagens são enviadas pelo backend para o Cloudinary, e a base guarda a URL e o identificador do ficheiro.

1. Instale as dependências com `npm install --prefix backend`.
2. Copie `backend/.env.example` para `backend/.env` e preencha `DATABASE_URL`, as três variáveis do Cloudinary e `ADMIN_API_KEY` com valores secretos.
3. Crie a base PostgreSQL e aplique a migração: `npm --prefix backend run prisma:migrate:dev -- --name init`.
4. Inicie a API com `npm run backend:dev`.

A API expõe `GET /api/projects` e `GET /api/projects/:id` publicamente. Criar, editar e apagar projetos exige o header `x-admin-key` com o valor de `ADMIN_API_KEY`. O painel existente ainda não tem autenticação; não coloque essa chave numa variável `VITE_*`, pois ela ficaria visível no navegador. Configure autenticação administrativa antes de ligar as ações de escrita do painel.

Na Railway, defina `Root Directory` como `backend`, use `npm run build` como build e `npm run start:prod` como início. Configure as variáveis de ambiente e execute `npm run prisma:migrate` após deploys com migrações. Na Vercel, publique o frontend e defina `WEB_ORIGIN` na Railway com a origem do site.

As credenciais do Cloudinary partilhadas no pedido devem ser revogadas e substituídas no painel antes de usar o serviço.

Rotas de escrita aceitam uma imagem opcional em multipart/form-data, campo `image`, até 5 MB (JPEG, PNG, WebP ou GIF.

## Formulário de contacto por email

O formulário envia os dados para a API Node em `server.js`, que usa Nodemailer e SMTP. As credenciais ficam apenas no servidor; não coloque passwords ou chaves SMTP em variáveis `VITE_*`.

1. Copie `.env.example` para `.env` e preencha `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` e `CONTACT_TO`. Use `SMTP_SECURE=true` para SMTP com TLS directo (normalmente porta 465); para STARTTLS (normalmente porta 587), use `false`.
2. Inicie a API com `npm run server`.
3. Noutro terminal, inicie o site com `npm run dev`.

O Vite encaminha `/api` para `http://localhost:5000` durante o desenvolvimento. Em produção, publique também `server.js` num serviço Node e configure `WEB_ORIGIN` com a origem exacta do site. Se a API estiver noutro domínio, configure `VITE_CONTACT_API_URL` com o URL completo da API, por exemplo `https://api.example.com/api/contact`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
