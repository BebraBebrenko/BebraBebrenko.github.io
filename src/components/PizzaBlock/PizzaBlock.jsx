import { useContext, useState } from "react";
import { CartContext } from "../../App";

function PizzaBlock({ title, price, imageUrl, sizes, types, id }) {
  const [activeSize, setActiveSize] = useState(0);
  const onClickSize = (id) => {
    setActiveSize(id);
  };

  const addToCart = () => {
    if (
      cart.some(
        (element) =>
          element.title === title &&
          element.size == sizes[activeSize] &&
          element.type == ActiveType
      )
    ) {
      setCart((prev) =>
        prev.map((element) => {
          if (
            element.title === title &&
            element.size == sizes[activeSize] &&
            element.type == ActiveType
          )
            return { ...element, count: element.count + 1 };
          return element;
        })
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          title,
          id,
          price,
          size: sizes[activeSize],
          type: ActiveType,
          imageUrl,
          count: 1,
        },
      ]);
    }
  };


  const [ActiveType, setActiveType] = useState(0);
  const onClickType = (id) => {
    setActiveType(id);
  };
  const [cart, setCart] = useContext(CartContext);
  return (
    <div className="pizza-block" key={id}>
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((i, id) => (
            <li
              key={i}
              onClick={() => onClickType(id)}
              className={ActiveType == id ? "active" : ""}
            >
              {id == 0 ? "традиционное" : "тонкое"}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((i, id) => (
            <li
              key={i}
              onClick={() => onClickSize(id)}
              className={activeSize == id ? "active" : ""}
            >
              {i + " см."}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price}₽</div>
        <button
          onClick={addToCart}
          className="button button--outline button--add"
        >
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{cart.reduce((total, item) => item.title == title ? total + item.count : total, 0)}</i>
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
