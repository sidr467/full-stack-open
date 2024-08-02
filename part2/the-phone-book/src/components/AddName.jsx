
const AddName = ({handleAdding,newName,newNumber,handleChangeNumber,handleChangeName}) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={handleAdding}>
        <div>
          <p>
            name:{" "}
            <input type="text" value={newName} onChange={handleChangeName} />
          </p>
          <p>
            number:{" "}
            <input
              type="number"
              value={newNumber}
              onChange={handleChangeNumber}
            />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddName
