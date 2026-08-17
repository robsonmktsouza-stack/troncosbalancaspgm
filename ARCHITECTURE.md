# Arquitetura PGM

## Camadas

```text
Internet
  │
  ├─ Site público / Catálogo
  │      └─ Solicitação de orçamento
  │
  └─ Portal autenticado
         ├─ Cliente
         ├─ Representante
         └─ Administração
                │
              Next.js
                │
              Prisma
                │
            PostgreSQL

Uploads ───────────────► volume local /storage
```

## Fluxo comercial

```text
Visita ao catálogo
  → Solicitação
  → Orçamento
  → Análise / proposta
  → Aprovação
  → Conversão em pedido
  → Comissão prevista
  → Produção
  → Expedição
  → Entrega
```

## Perfis

- `ADMIN`: visão global e manutenção da operação.
- `REPRESENTATIVE`: somente carteira/território vinculado.
- `CUSTOMER`: somente empresa vinculada à própria conta.

## Persistência

- PostgreSQL: dados transacionais e cadastros.
- `storage/`: documentos enviados pelo painel.
- Cookies HTTP-only: token de sessão aleatório; o token é validado contra a tabela `Session`.
