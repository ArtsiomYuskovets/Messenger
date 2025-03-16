import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7853167',
    database: 'messenger'
});

const connectToDb = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Ошибка подключения: ', err.stack);
            return;
        }
        console.log('Успешно подключено к базе данных как ID ' + connection.threadId);
    });
}
export default connection;
