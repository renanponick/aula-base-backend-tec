# Backend

## Banco de dados

Crie o banco MySQL `JogoTurnoAPI` antes de iniciar o backend. A tabela `Partidas` e sincronizada automaticamente. A conexao segue o padrao do codigo base: `localhost`, usuario `root` e senha vazia.

```sql
CREATE DATABASE JogoTurnoAPI;
```

## CRUD de partidas

Todas as rotas usam o prefixo `/partidas`:

- `GET /partidas` lista partidas.
- `GET /partidas/:id` busca uma partida.
- `POST /partidas` cria uma partida.
- `PUT /partidas/:id` atualiza um ou mais campos.
- `DELETE /partidas/:id` remove uma partida.

Exemplo de corpo para criar:

```json
{
	"descricao": "Campeao contra monstro",
	"data": "2026-11-05T10:00:00.000Z",
	"vencedor": "Campeao"
}
```

`descricao` e `data` sao obrigatorios na criacao. `vencedor` pode ser `null` enquanto a partida estiver em andamento.
