# Execução

## Objetivo

Conectar frontend aos endpoints existentes para login, CRUD do usuário autenticado e CRUD de carros, com uma interface simples para uso em aula introdutória.

## Estado

- Concluído: backend preservado sem alterações.
- Concluído: frontend reorganizado em fluxo com login, painel, carros, usuário e exemplo de aula React.
- Concluído: estilos reduzidos para CSS simples, reutilizável e responsivo.
- Concluído: login e cadastro de usuário.
- Concluído: consulta, alteração e exclusão do usuário autenticado.
- Concluído: listagem, cadastro, edição e exclusão de carros.
- Pendente de validação integrada: executar frontend e backend com MySQL disponível.
- Bloqueio de contrato existente: `Carro.usuarioId` é obrigatório no model, mas endpoint `POST /api/v1/carro/criar` ignora esse campo. A tela envia `marca` e `ano` conforme controller; criação pode falhar por validação do backend até esse contrato ser alinhado. Backend não foi alterado por solicitação do usuário.

## Verificações

- `npm run lint` no frontend: passou.
- `npm run build` no frontend: passou.
