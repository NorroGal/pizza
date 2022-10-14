import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Catigories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagintaion from '../components/Pagination';
import { searchContext } from '../App';
import { setCategoryId, setCurrentPage } from '../components/redux/sclices/filterSlice';


export const Home = () => {

  const { searchValue } = React.useContext(searchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    // fetch(`https://6338275d132b46ee0beb384a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });

    axios.get(`https://6338275d132b46ee0beb384a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      })

    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage]);



  const pizzas = items
    // .filter((obj) => {       //Этот метод больше статтический  без использования запроса на бэк          //перед тем как отрендерить пиццы -> отфильтруем
    //   if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);          // и уже отфильтрованные пиццы мапим в приложение
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Catigories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons
          : pizzas}
      </div>
      <Pagintaion currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}
