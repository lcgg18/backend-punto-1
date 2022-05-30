const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const cors = require('cors');
const PORT = 8000;


app.use(fileUpload());

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.get('/img', function (req, res) {


    const pathImagenJPG = __dirname + '/uploads/foto.jpg';
    if (pathImagenJPG) {
        if (fs.existsSync(pathImagenJPG)) {
           return res.sendFile(pathImagenJPG);
        }
    }

    const pathImagenPNG = __dirname + '/uploads/foto.png';
    if (pathImagenPNG) {
        if (fs.existsSync(pathImagenPNG)) {
            return res.sendFile(pathImagenPNG);
        }
    }
    const pathImagenGIF = __dirname + '/uploads/foto.gif';
    if (pathImagenGIF) {
        if (fs.existsSync(pathImagenGIF)) {
            return res.sendFile(pathImagenGIF);
        }
    }
    const pathImagenJPEG = __dirname + '/uploads/foto.jpeg';
    if (pathImagenJPEG) {
        if (fs.existsSync(pathImagenJPEG)) {
            return res.sendFile(pathImagenJPEG);
        }
    }
    

    res.json({
        status: 'error',
        msg: "Debes subir una imagen"
    })

});

app.post('/upload', function (req, res) {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).send('No hay archivos a cargar');
        return;
    }

    const { archivo } = req.files;

    const nombreCortado = archivo.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    const extensionesPermitidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (!extensionesPermitidas.includes(extensionArchivo)) {
        return res.status(400).json({
            msg: `La extension ${extensionArchivo} no es permitida, las extensiones permitidas son ${extensionesPermitidas.join(', ')}`
        });

    }

    const pathImagenJPG = __dirname + '/uploads/foto.jpg';
    if (pathImagenJPG) {
        if (fs.existsSync(pathImagenJPG)) {
        fs.unlinkSync(pathImagenJPG);
        }
    }

    const pathImagenPNG = __dirname + '/uploads/foto.png';
    if (pathImagenPNG) {
        if (fs.existsSync(pathImagenPNG)) {
        fs.unlinkSync(pathImagenPNG);
        }
    }
    const pathImagenGIF = __dirname + '/uploads/foto.gif';
    if (pathImagenGIF) {
        if (fs.existsSync(pathImagenGIF)) {
        fs.unlinkSync(pathImagenGIF);
        }
    }
    const pathImagenJPEG = __dirname + '/uploads/foto.jpeg';
    if (pathImagenJPEG) {
        if (fs.existsSync(pathImagenJPEG)) {
            fs.unlinkSync(pathImagenJPEG);
        }
    }
    

    const uploadPath = __dirname + '/uploads/' + 'foto' + '.' + extensionArchivo;

    archivo.mv(uploadPath, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).json({ msg: 'Hubo problemas al subir el archivo' });
        }

        res.json({ msg: 'Imagen cargada a ' + uploadPath });
    });
});

app.delete('/delete', function (req, res) {

    
    const pathImagenJPG = __dirname + '/uploads/foto.jpg';
    if (pathImagenJPG) {
        if (fs.existsSync(pathImagenJPG)) {
        fs.unlinkSync(pathImagenJPG);
        }
    }

    const pathImagenPNG = __dirname + '/uploads/foto.png';
    if (pathImagenPNG) {
        if (fs.existsSync(pathImagenPNG)) {
        fs.unlinkSync(pathImagenPNG);
        }
    }
    const pathImagenGIF = __dirname + '/uploads/foto.gif';
    if (pathImagenGIF) {
        if (fs.existsSync(pathImagenGIF)) {
        fs.unlinkSync(pathImagenGIF);
        }
    }
    const pathImagenJPEG = __dirname + '/uploads/foto.jpeg';
    if (pathImagenJPEG) {
        if (fs.existsSync(pathImagenJPEG)) {
            fs.unlinkSync(pathImagenJPEG);
        }
    }

   return res.json({
        msg: "Imagen eliminada"
    })
});

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});

