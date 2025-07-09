# Gerador de Certificados em PDF

Este projeto é uma API Node.js que gera certificados em PDF de forma personalizada, usando o pdfkit. Inclui um formulário web para facilitar o preenchimento dos dados e download do certificado.

## Funcionalidades
- Geração de certificados em PDF com layout estilizado (bordas, cores, logo, assinatura)
- Formulário web para preenchimento dos dados
- Campos: Nome, Curso, Carga horária, Instituição, Local de emissão
- Código de autenticação único em cada certificado
- Suporte a logo (adicione um arquivo `logo.png` na pasta `public` para aparecer no topo do certificado)

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   node index.js
   ```
3. Acesse no navegador:
   ```
   http://localhost:3000/
   ```

## Como usar

1. Preencha o formulário com os dados desejados.
2. Clique em "Gerar Certificado".
3. O PDF será baixado automaticamente.

## Personalização
- Para adicionar sua logo, coloque um arquivo `logo.png` na pasta `public`.
- Para alterar o layout, edite o arquivo `index.js` (cores, fontes, bordas, etc).

## Exemplo de requisição via API

Você também pode gerar certificados via API:

```
POST /certificado
Content-Type: application/json

{
  "nome": "Seu Nome",
  "curso": "Nome do Curso",
  "cargaHoraria": "40h",
  "instituicao": "Nome da Instituição",
  "local": "Cidade/UF"
}
```

A resposta será um PDF para download.

---

Feito com Node.js, Express e pdfkit. 