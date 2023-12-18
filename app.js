require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3000;


// Connection..
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
	console.log("MongoDB Connected..");
})
.catch((error)=>{
	console.log(`Connection failed due to ${error}`);
});

// Schema..
const recruiterSchema = new mongoose.Schema({
	name:{
		type: String
	},
	company:{
		type: String
	},
	contactNumber:{
		type: String
	},
	email:{
		type: String
	}
});

// Model..
const Recruiter = mongoose.model("Recruiter", recruiterSchema);



const app = express();


// API Middlwares..
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:false }));


// Routing..
app.get("/", (request, response)=>{
	response.sendFile(path.join(__dirname, "./public/home.html"));
});

app.get("/about", (request, response)=>{
	response.sendFile(path.join(__dirname, "./public/home.html"));
});

app.get("/project", (request, response)=>{
	response.sendFile(path.join(__dirname, "./public/project.html"));
});

app.get("/resume", (request, response)=>{
	response.sendFile(path.join(__dirname, "./public/resume.html"));
});

app.get("/contact", (request, response)=>{
	response.sendFile(path.join(__dirname, "./public/contact.html"));
});

app.get("/hire", (request, response)=>{
	response.sendFile(path.join(__dirname, "./public/hire.html"));
});

app.post("/formSuccess", (request, response)=>{
	response.sendFile(path.join(__dirname, "./public/success.html"));
	const credentials = request.body;
	Recruiter.create({
		name: credentials.name,
		company: credentials.company,
		contactNumber: credentials.contactno,
		email: credentials.email
	});
});


app.listen(PORT, ()=>{
	console.log(`App is listening on: http://localhost:${PORT}`);
});