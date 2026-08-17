# Troncos e Balanças Paragominas — Site + Catálogo + Portal B2B

Plataforma comercial completa da **Troncos e Balanças Paragominas**: site institucional com a identidade oficial da marca, catálogo técnico com fotos reais, área do cliente, CRM de representantes, orçamento/pedidos e painel administrativo.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4 + componentes no padrão shadcn/ui
- PostgreSQL 17
- Prisma ORM
- Autenticação própria por sessão persistente e perfis `ADMIN`, `CUSTOMER` e `REPRESENTATIVE`
- Docker + Docker Compose
- Uploads persistidos em volume local `storage/`

## Subir com Docker

```bash
cp .env.example .env
# edite POSTGRES_PASSWORD e DATABASE_URL com a mesma senha
docker compose up -d --build
```

Abra: `http://localhost:3000`

O entrypoint executa `prisma db push` e o seed idempotente antes de iniciar a aplicação.

### Contas demonstrativas

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | `admin@pgm.local` | `Pgm@2026` |
| Representante | `representante@pgm.local` | `Pgm@2026` |
| Cliente | `cliente@pgm.local` | `Pgm@2026` |

Troque/remova essas credenciais antes de publicar em produção.

## Módulos entregues

### Site público
- Identidade visual baseada no catálogo oficial PGM 2025
- Logo, paleta e fotografias reais dos equipamentos
- Home institucional responsiva
- Catálogo por categoria
- Busca por nome, SKU e descrição
- Página individual de produto
- Especificações técnicas e dimensões
- Documentos públicos por SKU
- Solicitação de orçamento geral ou por produto
- Distribuição automática da solicitação para representante por UF
- Página institucional
- Rede de representantes
- Contato conectado às configurações administrativas
- Menu mobile funcional

### Área do cliente
- Dashboard
- Histórico de orçamentos
- Pedidos e andamento de produção/expedição
- Rastreio quando informado
- Central de documentos privados
- Cadastro comercial, tabela de preço, crédito, representante e endereços

### Área do representante
- Dashboard territorial
- CRM de leads
- Cadastro de novo lead
- Carteira de clientes
- Orçamentos do território
- Comissão prevista/aprovada/paga
- Indicadores de pipeline

### Administrativo
- Dashboard executivo
- Cadastro e publicação de produtos/SKUs
- Ativar, inativar, rascunhar e destacar produtos
- Cadastro de clientes + criação do login
- Cadastro de representantes + território + criação do login
- Tabelas de preço por produto/quantidade mínima
- Funil de orçamentos
- Atualização de status
- Conversão de orçamento aprovado em pedido
- Geração automática de comissão ao converter
- Pedidos, produção e expedição
- Upload e vínculo de documentos a produtos ou clientes
- Controle de documento público/privado
- Auditoria de ações administrativas
- Configurações institucionais

## Modelo de dados

O Prisma contém entidades para usuários/sessões, clientes, endereços, representantes, leads, categorias, produtos, imagens, documentos, tabelas de preço, orçamentos, pedidos, comissões, notificações, auditoria e configurações.

## Arquivos

Uploads reais ficam em `./storage` no host e são montados em `/app/storage` no container. Documentos privados de clientes passam por uma rota protegida que valida o perfil e o vínculo antes de devolver o arquivo.

## Saúde da aplicação

`GET /api/health` testa aplicação + acesso ao PostgreSQL.

## Backup

```bash
sh scripts/backup.sh
```

Restauração:

```bash
sh scripts/restore.sh backups/pgm-AAAAMMDD-HHMMSS.sql.gz
```

## Produção

Antes de publicar:
1. trocar senha do PostgreSQL;
2. remover ou trocar usuários demo;
3. revisar os dados da PGM em **Administração → Configurações**;
4. substituir documentos demonstrativos por fichas oficiais;
5. revisar preços e cadastrar a rede de representantes;
6. colocar proxy HTTPS (Caddy, Nginx ou serviço equivalente) na frente da porta 3000;
7. configurar rotina externa de backup do volume PostgreSQL e `storage/`.
