import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const app = express();
const prisma = new PrismaClient();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`<h1>Server for praktikaportaal</h1>`)
});

app.get('/users', async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
});

app.get('/user/create', (req, res) => {
    res.send(`
    <form action="/userCreate" method="post">
        <label for="firstName">First name</label>
        <input type="text" id="firstName" name="firstName" required><br>
        <label for="lastName">Last name</label>
        <input type="text" id="lastName" name="lastName" required><br>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required><br>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required><br>
        <button type="submit">Submit</button>
    </form>
    `);
});

app.post('/user/create', async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }
        });

        res.redirect('/users');
    }
    catch {
        res.send('Error creating user or user already exists');
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});