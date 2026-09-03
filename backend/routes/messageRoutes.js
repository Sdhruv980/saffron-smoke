import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const FILE = "./data/messages.json";


// Read messages
function readMessages() {

  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
  }

  const data = fs.readFileSync(FILE, "utf8");

  return JSON.parse(data || "[]");
}



// Save messages
function saveMessages(messages) {

  console.log("Saving file:", FILE);

  fs.writeFileSync(
    FILE,
    JSON.stringify(messages, null, 2)
  );

}



// Add message
router.post("/", (req, res) => {

  const messages = readMessages();


  const newMessage = {

    id: Date.now(),

    name: req.body.name,

    email: req.body.email,

    subject: req.body.subject,

    message: req.body.message,

    status: "Unread",

    createdAt: new Date()

  };


  messages.push(newMessage);


  saveMessages(messages);


  res.json({
    success:true,
    message:"Message saved",
    data:newMessage
  });


});



// Get messages
router.get("/", (req,res)=>{

  const messages = readMessages();

  res.json(messages);

});



// Delete message
router.delete("/:id",(req,res)=>{

  let messages = readMessages();


  messages = messages.filter(
    (msg)=>msg.id != req.params.id
  );


  saveMessages(messages);


  res.json({
    success:true,
    message:"Deleted"
  });

});


export default router;