import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express();
const hbs = create({});

const port = process.env.PORT || 3000

//Setup static directory to serve
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, './public')));

//Register hbs.engine with the Express app.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.enable('view cache');
app.get('/', (req, res) => {
	res.render('home');
});

app.listen(port);

