import './App.css';
import { useState } from "react";

const Load = ()=>{
  return(
    <div className="text-center d-inline">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}

function App() {
  const [inputs, setInputs] = useState({
    prompt:"",size:""
  })
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    console.log(e.target.value);
    setInputs((prevState)=> ({
    ...prevState,[e.target.name] : e.target.value}))
  }

  const generateImageRequest = async()=>{

    try {
      setLoading(true); // Set loading before sending API request
      const response = await fetch('http://localhost:4000/openai/generateImage', {
      method: 'POST',
      body: JSON.stringify({
          prompt:inputs.prompt,
          size:inputs.size
      }),
      headers: {
          'Content-type': 'application/json',
      },
  }).then(console.log("Data sent"))
      if(!response.ok) throw new Error("Could not generate the Image")
      else {
        const data = await response.json()
        console.log(data)
        setImg(data.image)
      }
      setLoading(false)
  } catch (error) {
      setLoading(false)
      console.error(error);
  }
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log(inputs)
    generateImageRequest()
  }


  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky top">
        <div className="container-fluid">
          <h3 className="navbar-brand">Text to Image</h3>
          <span className="navbar-text">Powered By OpenAI</span>
        </div>
      </nav>
      <section>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-4 col-1"></div>
            <div className="col-sm-4 col-10">
              <input type="text" className="form-control" placeholder="Enter something" name="prompt" onChange={handleChange}></input>
              <select className="form-select" name='size' onChange={handleChange}>
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
              </select>
              <button type="submit" className="btn btn-primary">Generate</button>
              {loading? <Load/>:null}
            </div>
            <div className="col-sm-4 col-1"></div>
          </div>
        </form>
      </section>
      <section className='image-section'>
        <div>
          {/* <h2 className="msg"></h2> */}
          <img src={img} alt="" id="image" className='img-thumbnail mx-auto d-block'></img>
        </div>
      </section>
    </>
  );
}

export default App;
