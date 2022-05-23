const Categories = (props) => {
  return (
    <div>
      <select
        onChange={(e) =>
          props.setCategory({ choice: 1, value: e.target.value })
        }
      >
        <option> Category</option>
        {props.categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        onChange={(e) =>
          props.setCategory({ choice: 2, value: e.target.value })
        }
      >
        <option> Category</option>
        {props.categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        onChange={(e) =>
          props.setCategory({ choice: 3, value: e.target.value })
        }
      >
        <option> Category</option>
        {props.categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Categories;
