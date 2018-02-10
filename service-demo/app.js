/*express 对底层进行了封装  比核心http简单*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

let pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    database: 'db',
    password: '',
    connectionLimit: 10
});
let app = new express();

//express 中间件  普通数据使用
/*app.use(bodyParser.urlencoded({extended: true}));*/
//express 中间件  json数据使用
app.use(bodyParser.json());


app.post('/signUp', (req, res) => {
    let user = req.body.user;
    let sql = "SELECT * FROM db.user WHERE email=?";
    pool.query(sql, [user.email], (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            res.send({"status": "exist"});
        } else {
            let sql = "INSERT INTO db.user VALUES(NULL,?,?,?,?,?,?)";
            pool.query(sql, [user.email, user.username, user.password, user.gender, user.age, user.city], (err, results) => {
                if (err) throw err;
                if (results.affectedRows === 1) {
                    res.send({"status": "ok"});
                } else {
                    res.send({"status": "err"});
                }
            })
        }
    });
});


app.listen('3000');