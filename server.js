const { app,User, Score} = require('./src/main');
const { MySql, dbSnake } = require('./src/connections/snakeMySQL');



app.listen(3000, () => {
    console.log('Server listen port 3000...');

});

const initWebServer=()=>{



}

const initMySql = async(login) => {
    try {
        let configDB = {
            database: dbSnake.database,
            username: login.username,
            password: login.password,
            dbConfig: dbSnake.dbConfig
        };

        console.log(configDB);

        mysql=new MySql (configDB);
        //testDB
        console.log('test MySQL');
        await mysql.authenticate();
        console.log('OK connection..');
        //Users
        User.init(mysql);
        Score.init(mysql);

    } catch (error) {
     console.error(error);
    }

}

initMySql ({ username: 'Dolores', password: '123456' });