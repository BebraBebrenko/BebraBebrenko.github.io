import React, {useContext, useState} from "react";
import { FilterContext, OffsetContext } from "../App";
function Categories() {

    const [Active, setActive] = useContext(FilterContext);
    const [itemOffset, setItemOffset] = useContext(OffsetContext);
    const onClickCategory = (id) => {
        setActive(id);
    }

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (

    <div className="categories">
      <ul>
        {categories.map((i, id) => (<li key = {i} onClick={() => (onClickCategory(id), setItemOffset(0))} className={Active == id ? 'active' : ''}>{i}</li>))}
      </ul>
    </div>

  )
}
export default Categories;