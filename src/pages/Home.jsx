import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';


import Catigories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagintaion from '../components/Pagination';
import { searchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../components/redux/sclices/filterSlice';
import { fetchPizzas } from '../components/redux/sclices/pizzaSlice';


export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue } = React.useContext(searchContext);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const { items, status } = useSelector((state) => state.pizza);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  const getPizzas = async () => {

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    // fetch(`https://6338275d132b46ee0beb384a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });                                  //Это метод fetch

    // axios
    //   .get(`https://6338275d132b46ee0beb384a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    //   .then(response => {
    //     setItems(response.data);
    //     setIsLoading(false);
    //   }).catch((err) => {              //находит и показывает ошибку
    //     setIsLoading(false);
    //   })                                  //Это метод axios



    dispatch(fetchPizzas({
      category,
      order,
      sortBy,
      search,
      currentPage,
    }),
    );
    window.scrollTo(0, 0)
  }



  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({
        ...params,
        sort,
      }))
      isSearch.current = true;
    }
  }, []);


  React.useEffect(() => {
    // window.scrollTo(0, 0)
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;

  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true;
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
      {
        status === 'error' ? (<div className='content__error-info'>
          <h2> Произошла ошибка <icon>😕</icon></h2>
          <p>
            Не удолось загрузить пиццы.
            Попробуйте повторить попытку позже... Наврядли она будет работать , но вы на всякий случай попытайтесь :)
          </p>
        </div>
        ) : (<div className="content__items">
          {status === 'loading'
            ? skeletons
            : pizzas}
        </div>)
      }
      <Pagintaion currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}












































































/////////////////////////////////////////////////////////////////////////////////////

  // React.useEffect(() => {
  //   getPizzas();
  // }, []);
  // //  замена ниже строчек 



  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     }

  //     const queryString = qs.stringify(params, { skippNulls: true });

  //     navigate(`/?${queryString}`);
  //   }

  //   if (window.location.search) {
  //     fetchPizzas();
  //   }
  // }, [categoryId, sortType, searchValue, currentPage]);
  // //  замена ниже строчек 
/////////////////////////////////////////////////////////////////////////////////////