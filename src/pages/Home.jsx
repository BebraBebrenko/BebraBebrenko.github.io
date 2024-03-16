import { useState, useEffect, useContext } from "react";
import "../scss/app.scss";
import ReactPaginate from 'react-paginate';
import { FilterContext, OffsetContext, SortContext, iSortContext } from "../App";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import styles from './home.module.scss';
const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSort, setActiveSort] = useContext(SortContext);
  const [iSort, setiSort] = useContext(iSortContext);
  const [Filter, setFilter] = useContext(FilterContext);
  const [itemOffset, setItemOffset] = useContext(OffsetContext);
  useEffect(() => {
    fetch("https://65cfc233bdb50d5e5f5bcdcb.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
  }, []);
  function filterItemsByCategory(items) {
    if (Filter == 0) {
      return items;
    } else {
      return items.filter((item) => item.category == Filter);
    }
  }
  function sortItems(items) {
    let sortedItems = items;
    sortedItems.sort((a, b) => {
      if (activeSort == 0) {
        return a.id - b.id;
      } else if (activeSort == 1) {
        return a.price - b.price;
      } else if (activeSort == 2) {
        return a.title.localeCompare(b.title);
      }
    
    });
    return sortedItems;
  }
  function inverse(items){
    if (iSort) {
      return items.reverse()
    }
    return items
  }
  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые"];
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      <h2 className="content__title">{categories[Filter]} пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(8)].map((_, id) => <Skeleton key={id} />)
          : inverse(sortItems(filterItemsByCategory(items))).slice(itemOffset, endOffset).map((obj) => (
              <PizzaBlock {...obj} key={obj.id} />
            ))}
      </div>
      <ReactPaginate containerClassName={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => handlePageClick(event)}
        pageRangeDisplayed={5}
        pageCount={(filterItemsByCategory(items)).length / itemsPerPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Home;
