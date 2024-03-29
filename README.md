# Sistema-Grupos-Academicos

Sistema voltado para operações de inclusão,listagem, alteração e remoção de participantes, eventos e processo seletivos envolvendo grupos acadêmicos.

**Passos para execução do programa**

- Clone o repositório através do comando ```git clone https://github.com/PedroGSantos/Sistema-Grupos-Academicos.git```

- Instale o framework node pelo seguinte link: https://nodejs.org/en/

- Com o repositório clonado, e com o terminal aberto na pasta do projeto, execute o comando ```npm install``` para instalação das bibliotecas.

- Após a instalação das bibliotecas, crie um arquivo chamado .env com a seguinte variável de ambiente (sabemos que não se expõe esses dados do banco publicamente, mas está aqui para facilitar) ```DATABASE_URL="postgresql://doadmin:AVNS_ujaGrEgwe2HRpConC_Y@banco-dos-brabo-do-user-12479900-0.b.db.ondigitalocean.com:25060/defaultdb?schema=public"```

- Por fim, rode o comando ```npm start``` para executar o servidor.

- Para teste das rotas, baixe o Insomnia pelo seguinte link: https://insomnia.rest/download. Após isso, importe o arquivo Insomnia_template.json no Insomnia, todas as rotas ja estarão listadas e configuradas. Certifique-se de estar usando as variáveis corretas: GA para requisitar a API em deploy, Local para requisições locais no servidor em execução pelo ```npm start```. Algumas rotas exigirão um login, para isso basta acessar a rota de login e enviar o token nas outras rotas, para isso adicione o campo no header da requisição com chave token e valor obtido no login.
  - Seleção de ambiente para variáveis do insomnia no canto superior esquerdo
   
  ![image](https://user-images.githubusercontent.com/37910255/192169675-32d1bc35-efea-4fa0-b274-1a28a5c4744e.png)
