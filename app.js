const express=require('express');
const fileUpload=require('express-fileUpload');
const app=express();
const logger =require('morgan');
var cors=require('cors');

app.use(express.static('./assets/'));
app.use(cors('*'));
app.use(logger('combined'));
app.use(fileUpload());
app.post('/upload',(req,res)=>{
	if(!req.files)
		return res.status(400).json({msg:'No hay arhivos para subir'});
	let files=req.files.archivo;
	console.log(req.files.archivo.name);
	let name=req.files.archivo.name;
	files.mv('assets/files/'+name,(err)=>{
		if(err)
		{
			console.log(err)
			return res.status(500).json({msg:'error al subir foto'})
		}
		res.json({msg:'Guardado correctamente.',foto:'/files/'+name});
	})
})

app.post('/uploads',(req,res)=>{
	console.log(req);
})

app.listen(3000,(err)=>{
	console.log("Servidor corriendo en el puerto 3000")
})