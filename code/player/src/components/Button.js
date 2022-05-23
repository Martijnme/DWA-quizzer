function Button(props) {
  return (
    <button className={props.classStyle + ' btn'}>
      <p>{props.text}</p>
    </button>
  )
}

export default Button
