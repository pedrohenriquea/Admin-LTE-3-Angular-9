
#Tutorial de configuração do backend json-server:

1. Crie uma pasta para o backend.
2. Caminhe até o diretório da pasta.
3. Execute o comando 'npm init -y'.
4. Execute o comando 'npm i json-server'.
5. Crie um novo arquivo chamado 'db.json' e insira os atributos conforme o exemplo abaixo:

    {
        "culturas": []

    }

6. Agora, abra o arquivo 'package.json'. Substitua o script default 'test' por:
     
     "start": "json-server --watch db.json --port 3001" 

7. Para startar o servidor, execute o comando 'npm start'.