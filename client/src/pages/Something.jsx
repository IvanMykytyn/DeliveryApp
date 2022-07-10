import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import FileBase64 from 'react-file-base64'

const Something = () => {
  const [state, setState] = useState({
    name: '',
    price: 0,
    photo: null,
    shopId: null,
  })

  const [data, setData] = useState([])

  const onSubmit = async (e) => {
    console.log('lol')
    e.preventDefault()
    console.log(state)
    const { data } = await axios.post(`/upload`, state)

    console.log(data)

    console.log('lol')
  }
  const handleNameChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        name: e.target.value,
      }
    })
  }
  const handlePriceChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        price: e.target.value,
      }
    })
  }
  const handleShopIdChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        shopId: e.target.value,
      }
    })
  }
  const getData = async () => {
    console.log('lol');
    const { data } = await axios.get(`/getsomething`).catch(e=> console.log(e))
    console.log(data)
    setData(data)
  }

  return (
    <>
      <form className="something" onSubmit={onSubmit}>
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setState({ ...state, photo: base64 })}
        />
        <input name="name" type="text" onChange={handleNameChange}></input>
        <input name="price" type="number" step='0.01' onChange={handlePriceChange}></input>
        <input name="price" type="text" onChange={handleShopIdChange}></input>

        <button type="submit">Submit</button>
      </form>
      <button type="button" onClick={getData}>
        Submit
      </button>
      {data?.map((item) => (
        <div className="card" key={item._id}>
          <div className="card-image waves-effect waves-block waves-light">
            <img
              className="activator"
              style={{ width: '100%', height: 300 }}
              src={item.photo}
            />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {item.name}
            </span>
          </div>
        </div>
      ))}
    </>
  )
}

export default Something
