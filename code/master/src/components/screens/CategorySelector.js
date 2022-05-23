import GameButton from "../GameButtons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/getData";
import { setCategory } from "../../redux/actions/postData";
import { useState, useEffect } from "react";
import Categories from "../Categories";

const CategorySelector = (props) => {
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);

  const filled = () => selectedCats;
  const setCategory = (e) => {
    if (e.value !== "Category") {
      let result = selectedCats;
      if (e.one) {
        result.one = e.one;
      } else if (e.two) {
        result.two = e.two;
      } else if (e.three) {
        result.three = e.three;
      }

      props.setCategory(e);
      setSelectedCats(props.selectedcategory);
    }
  };
  useEffect(() => {
    props.getCategories();
    setCategories(props.categories);
  }, categories);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  useEffect(() => {
    setSelectedCats(props.selectedcategory);
  }, [props.selectedcategory]);

  return (
    <>
      <div className="picker-center">
        <h3>Category selector</h3>
        {categories && categories.length > 0 ? (
          <Categories
            categories={categories}
            selected={selectedCats}
            setCategory={setCategory}
          />
        ) : (
          ""
        )}
      </div>
      <GameButton
        routeNext="/questionpicker"
        routeBack="/"
        prev="category"
        selection={filled}
      />
    </>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.game.categories,
    selectedcategory: state.game.selectedcategory,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCategories: getCategories,
      setCategory: setCategory,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
