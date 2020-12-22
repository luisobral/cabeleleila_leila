ao baixar o pacote é necessário dar npm install para baixar os modulos
para ativar o banco primeiro terá que trocar os dados do arquivo que está em backend/knexfile.js
entre a linha 8 a linha 11 terá que fazer alteração para se adequar ao banco mysql
terá que ser criado um schema com nome igual o que está na linha 11
é necessário estar rodando o serviço de mysql para funcionar
após fazer essas alterações entre no cmd acesse a pasta backend
insira o seguinte comando
npx knex migrate:latest
após isso as tabelas serão criadas
estou deixando um pacote json para que possa importa para o insomnia para usar como uma api apra criar os dados
da tabela tipo e funcionario as quais não foram criadas processos de inserção no banco por meio da página web
deixei todas as rotas de fácil acesso e fácil compreendimento