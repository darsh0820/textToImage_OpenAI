const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req,resp) =>{
    const {prompt,size} = req.body
    const imageSize = (size === 'small') ? '256x256' : (size === 'medium') ? '512x512' : '1024x1024'
    try{
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize
        })
        const imageURL = response.data.data[0].url
        resp.status(200).json({
            success: true,
            image: imageURL,
        })
    } catch(error){
        resp.status(400).json({
            success: false,
            error: 'Could not generate the Image',
        })
    }
}
module.exports = {generateImage}