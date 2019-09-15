# LectionWeb

#### Настройка БД
```
$ psql -h localhost -U postgres
> CREATE database people;
> CREATE role example WITH password 'example';
> GRANT ALL PRIVILEGES ON database people TO example;
> ALTER role example WITH login;
> /q
$ psql -h localhost -U example people
```

#### Настройка NodeJs

1. Установить [NodeJs](https://nodejs.org/en/download/current/)
2. В дирректории с приложением выполнить: 
 ```
 npm i 
 ```
3. В дирректории с приложением выполнить: 
 ```
 npm start
 ```
