const express = require('express');
const bodyParser = require('body-parser');

const parser = bodyParser.urlencoded({ extended: false });
const app = express();

app.listen(3000, console.log('Server started'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index_dark', { arrProducts });
});

app.get('/addProduct', (req, res) => {
    res.render('themProduct', { arrProducts });
});

app.post('/themProduct', parser, (req, res) => {
    const { idProduct, nameProduct, description, imageProduct, idVideoProduct } = req.body;
    arrProducts.push(new Product(parseInt(idProduct, 10), nameProduct, description, 
    imageProduct, idVideoProduct));
    res.redirect('/');
});

app.get('/xoa/:id', (req, res) => {
    const { id } = req.params;
    const index = findIdArrayObject(parseInt(id, 10), arrProducts);
     
    arrProducts.splice(index, 1);
    res.redirect('/addProduct');
});

app.get('/sua/:id', (req, res) => {
    const { id } = req.params;
    const index = findIdArrayObject(parseInt(id, 10), arrProducts);
    // findIndex(fn): tim index mang Obj 
    const indexArr = arrProducts.findIndex(e => e.id === id);
    res.render('capnhatProduct', { product: arrProducts[index] });
});

app.post('/sua', parser, (req, res) => {
    const { idProduct, nameProduct, description, imageProduct, idVideoProduct } = req.body;
    const index = findIdArrayObject(parseInt(idProduct, 10), arrProducts);
    arrProducts[index].name = nameProduct;
    arrProducts[index].desc = description;
    arrProducts[index].image = imageProduct;
    arrProducts[index].idVideo = idVideoProduct;
    res.redirect('/addProduct');
});

function findIdArrayObject(id, myArray) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].id === id) {
            return i;
        }
    }
    return 0;
}

function searchObjectInArray(idKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].id === idKey) {
            return myArray[i];
        }
    }
}

class Product {
    constructor(id, name, desc, image, idVideo) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.image = image;
        this.idVideo = idVideo;
    }
}

const arrProducts = [
    new Product(1, 'NodeJs', 'learn nodejs', '18058390_th.jpg', 18058390),
    new Product(2, 'React Native', 'learn react', '16501557_th.jpg', 63653873),
    new Product(3, 'PHP', 'learn php', '18081777_th.jpg', 40487907)
];
