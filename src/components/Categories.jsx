import React from "react";

function Catigories( { value, onClickCategory} ) {

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  //   // console.log(1213212123113);
  //   //так лучше делать если у тебя мого задач 
  // };

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, i) => (<li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>{categoryName}</li>))
        }
      </ul>
    </div>
  );
}

export default Catigories;