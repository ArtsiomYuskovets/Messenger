import express, { query } from 'express';
import cors from 'cors';
import connection from './db.js';
import bcrypt from 'bcrypt'

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const hashPassword = async (password) => {
    try {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error('Ошибка при хешировании пароля:', err);
        throw err;
    }
};

app.post('/login', (req, res) => {
    const { email, password } = req.body; 
    const hashedPassword=hashPassword(password);
    const checkQuery = 'SELECT * FROM users WHERE Email = ?';

    connection,query(checkQuery,[email],(err,result)=>{
        if(err){
            console.error('Ошибка при выполнении запроса: ', err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
        if(result.length>0){
            if(result[0].Email===email && result[0].PasswordHash===hashedPassword){
                return res.status(200).json({ message: 'Авторизация успешна!' });
            }
            else{
                res.status(401).json({ message: 'Неверный email или пароль' });
            }
        }
    })

});
app.post('/register', (req, res) => {
    const { userName, email, password } = req.body;
    const createdAt = new Date();

    const checkQuery = 'SELECT * FROM users WHERE Username = ? OR Email = ?';

    connection.query(checkQuery, [userName, email], (err, results) => {
        if (err) {
            console.error('Ошибка при выполнении запроса: ', err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }

        if (results.length > 0) {
            if (results[0].Username === userName) {
                return res.status(400).json({ error: 'Пользователь с таким именем уже существует' });
            }
            if (results[0].Email === email) {
                return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
            }
        }

        const hashedPassowrd=hashPassword(password);

        const insertQuery = 'INSERT INTO users (Username, Email, PasswordHash, DateCreated) VALUES (?, ?, ?,?)';

        connection.query(insertQuery, [userName, email, hashedPassowrd, createdAt], (err) => {
            if (err) {
                console.error('Ошибка при добавлении пользователя: ', err);
                return res.status(500).json({ error: 'Ошибка сервера' });
            }

            res.status(201).json({ message: 'Регистрация успешна!' });
        });
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
