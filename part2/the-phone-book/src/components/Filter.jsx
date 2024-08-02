
const Filter = ({filter,handleFilter}) => {
  return (
    <div>
      <p>
          filter shown with{" "}
          <input type="text" value={filter} onChange={handleFilter} />
        </p>
    </div>
  )
}

export default Filter
