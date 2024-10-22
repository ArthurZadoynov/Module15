const Card = ({ item, removeItem }) => {

  return (
    <li className="card">
      <h2>Продукт: {item.name}</h2>
      <h3>Цена: {item.price}</h3>
      <h4>Описание: {item.description}</h4>
      <h5>Город: {item.city}</h5>
      <button className="delete-btn" onClick={() => removeItem(item.id)}>Удалить</button>
    </li >
  );
}

export default Card;