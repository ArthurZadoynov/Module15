import { useState } from 'react'
import Card from './components/Card'
import { useEffect } from 'react'


function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    const fetchData = async () => {// Определяем асинхронную функцию для получения данных
      try {
        const response = await fetch('https://c4e957f8a48ced1d.mokky.dev/items')
        let products = await response.json()
        setData(products)
        
      } catch(error){
        console.error('Ошибка получения данных:', error)
      }
    }
    fetchData()
  }, [])

  const updateData = async () => {
    try {
      const response = await fetch('https://c4e957f8a48ced1d.mokky.dev/items')
      let products = await response.json()
      setData(products)
      
    } catch(error){
      console.error('Ошибка получения данных:', error)
    }
  }

  async function removeItem(id) { 
    await fetch(`https://c4e957f8a48ced1d.mokky.dev/items/${id}`, {
      method: "DELETE",
    });
    updateData()
  }

  const addItem = async(e) => {
    e.preventDefault()
    const newItem = {
      id: Date.now().toString(),
      name,
      price,
      description,
      city
    }
    try {
      const response = await fetch ('https://c4e957f8a48ced1d.mokky.dev/items', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newItem)
      })
      const data = await response.json()
      setData(prevData => [...prevData, data])
      setName('')
      setPrice('')
      setDescription('')
      setCity('')
    } catch(error) {
      console.error('Ошибка, товар не добавлен', error)
    }
  }

  return (
    <main>
      <div className='container'>
        <form onSubmit={addItem}>
          <input
            type='text'
            placeholder='Название'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
          <input
            type='number'
            placeholder='Цена'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required 
          />
          <input
            type='text'
            placeholder='Описание'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required 
          />
          <input
            type='text'
            placeholder='Город'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required 
          />
          <button type='submit'>Создать товар</button>
        </form>
        <ul>
          {data.map((item) => (
            <Card key={item.id} item={item} removeItem={removeItem}/>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default App;
