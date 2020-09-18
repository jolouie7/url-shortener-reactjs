import React, {useState} from 'react';

function App() {
  const [longUrl, setLongUrl] = useState("")
  const [shortUrl, setshortUrl] = useState("")
  const [data, setData] = useState({})

  const handleChange = (e) => {
    setLongUrl(e.target.value)
  }

  const showRes = async () => {
    const response = await fetch(`http://localhost:5000/`);
    const data = await response.json()
    setData(data);
    console.log(data)
  }

  const createShortUrl = async () => {
    const res = await fetch("http://localhost:5000/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({longUrl: longUrl}),
    });
    const content = await res.json()
    setLongUrl("");
    return content
  }

  const handleClick = async () => {
    createShortUrl();
    showRes();
  }
  return (
    <div>
      <label>Enter a URL here</label>
      <input
        placeholder="Enter URL here"
        value={longUrl}
        onChange={handleChange}
      ></input>
      <button type="button" onClick={handleClick}>
        Shorten
      </button>
      <p>{Object.keys(data).length !== 0 ? data[data.length-1].shortUrl + data[data.length-1].urlCode: null}</p>
    </div>
  );
}

export default App;
