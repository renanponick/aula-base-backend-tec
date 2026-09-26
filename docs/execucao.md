# Execução

## Objetivo

Conectar frontend aos endpoints existentes para login, CRUD do usuário autenticado e CRUD de carros.

## Estado

- Implementado: cliente HTTP com token JWT, proxy Vite e persistência de sessão.
- Implementado: login e cadastro de usuário.
- Implementado: consulta, alteração e exclusão do usuário autenticado.
- Implementado: listagem, cadastro, edição e exclusão de carros.
- Pendente de validação integrada: executar frontend e backend com MySQL disponível.
- Bloqueio de contrato existente: `Carro.usuarioId` é obrigatório no model, mas endpoint `POST /api/v1/carro/criar` ignora esse campo. A tela envia `marca` e `ano` conforme controller; criação pode falhar por validação do backend até esse contrato ser alinhado.

## Verificações

- `npm run lint` no frontend.
- `npm run build` no frontend.
