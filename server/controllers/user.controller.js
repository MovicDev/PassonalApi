const {userModel, genModel} = require("../models/user.model");    
const { GoogleGenerativeAI } = require("@google/generative-ai");

const dotenv  = require("dotenv")
dotenv.config()


const addAIgen = async (req, res) =>{
    try{
        const {message} = req.body
        const genAI = new GoogleGenerativeAI(process.env.GEMINI);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const prompt = message
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log(text);
        const saveAnwsered = await userModel.create({message})
        const anwsered = await genModel.create({answer:text})
        await saveAnwsered.save()
        await anwsered.save()

    }
    catch(err){
        console.log(err.message);
    }
}

const getAIgen = async (req, res) => {
    try {
        const gemini = await genModel.find();
        const geminiUser = await userModel.find();
        res.status(200).json({
            message: 'Generated',
            status: true,
            prompt: gemini,
            geminiUser
        });
    } catch (err) {
        res.status(500).json({
            message: 'There was an error',
            status: false,
            errMessage: err.message
        });
    }
};

module.exports = {addAIgen, getAIgen} 
