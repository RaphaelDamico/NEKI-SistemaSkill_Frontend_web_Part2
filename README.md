# NEKI-SistemaSkill_Frontend_web_Part2

Este projeto é uma aplicação web desenvolvida em React e Vite para gerenciar habilidades (skills) de usuários. A aplicação oferece funcionalidades de login, cadastro de usuários e gerenciamento de skills, com segurança de privatização de rotas para proteger o acesso às funcionalidades.

## Funcionalidades

1. **Tela de Login**
   - **Descrição:** Permite ao usuário realizar login na aplicação.
   - **Componentes:**
     - **Campo de Login:** Input para o usuário inserir seu username.
     - **Campo de Senha:** Input para o usuário inserir sua senha.
     - **Botão de Visualizar Senha:** Permite ao usuário alternar a visibilidade da senha.
     - **Checkbox de Gravar Senha:** Se selecionado, armazena o login e senha no local storage para preenchimento automático em acessos futuros.
     - **Botão de Entrar:** Verifica as credenciais e, se corretas, redireciona o usuário para a Home.
     - **Botão de Cadastrar-se:** Redireciona para a tela de cadastro.

2. **Tela de Cadastro**
   - **Descrição:** Permite ao usuário se registrar na aplicação.
   - **Componentes:**
     - **Campo de Username:** Input para o usuário inserir seu username.
     - **Campo de Senha:** Input para o usuário inserir sua senha.
     - **Campo de Confirmar Senha:** Input para confirmar a senha.
     - **Botões de Visualizar Senha:** Permitem ao usuário alternar a visibilidade das senhas inseridas.
     - **Botão de Cadastrar:** Valida se a senha e a confirmação são iguais, chama o endpoint de cadastro e exibe uma mensagem de sucesso.
     - **Botão de Cancelar:** Retorna para a tela de login.

3. **Tela Home**
   - **Descrição:** Exibe a lista de skills associadas ao usuário logado em forma paginada e com ordenação, permitindo ao usuário gerenciá-las, de forma que o usuário possa alterar o seu nível, de uma a 5 estrelas ou deletar de sua lista de skills.
   - **Componentes:**
     - **Lista de Skills:** Exibe a imagem (URL), nome da skill, nível (em forma de estrelas) e descrição. O nível pode ser editado diretamente na lista.
     - **Botão de Editar Skill:** Permite que o usuário edite o nível da skill na lista.
     - **Botão de Excluir Skill:** Permite remover uma skill da lista.
     - **Botão de Adicionar Skill:** Abre uma modal para adicionar uma nova skill. A modal inclui:
       - **Lista de Seleção de Skill:** Lista de skills paginadas e ordenadas disponíveis cadastradas e  retornadas de um endpoint da api.
       - **Botão de Salvar:** Salva a nova skill associada ao usuário.
       - **Botão de Cancelar:** Fecha a modal sem salvar.
     - **Botão de Logout:** Encerra a sessão do usuário.

4. **Segurança**
   - **Descrição:** Acesso à página Home é restrito a usuários logados. Usuários não autenticados são redirecionados para a página de login.

## Como Executar o Projeto

1. **Pré-requisitos:** Certifique-se de ter o [Node.js](https://nodejs.org/)

2. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/RaphaelDamico/NEKI-SistemaSkill_Frontend_web_Part2.git

3. **Instalar dependências:**
```bash
npm install
```

4. **Executar aplicação:**
```bash
npm run dev

