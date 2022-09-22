# Sistema-Grupos-Academicos

Sistema voltado para operações de inclusão,listagem, alteração e remoção de participantes, eventos e processo seletivos envolvendo grupos acadêmicos.

**Passos para execução do programa**

- Baixe o repositório através do comando ```git clone https://github.com/PedroGSantos/Sistema-Grupos-Academicos.git```

- Baixe o framework node pelo seguinte link: https://nodejs.org/en/

- Com o repositório baixado na máquina, execute o comando ```npm install``` para instalação das bibliotecas

- Após a instalação das bibliotecas, crie um arquivo chamado .env com a seguinte variável de ambiente ```DATABASE_URL="postgresql://doadmin:AVNS_ujaGrEgwe2HRpConC_Y@banco-dos-brabo-do-user-12479900-0.b.db.ondigitalocean.com:25060/defaultdb?schema=public"```

- Por fim, rode o comando ```npm start``` para executar o servidor,

- Para teste das rotas, baixe o Insomnia pelo seguinte link: https://insomnia.rest/download. Após isso, abra o arquivo Insomnia_2022-09-22.json dentro do Insomnia, todas as rotas ja estarão listadas e configuradas. Algumas rotas exigirão um login, para isso basta acessar a rota de login e enviar o token nas outras rotas.
