const Note = ({ note, togglrImportance }) => {
  const lable = note.important ? "make not important" : "make important"

  return (
    <>
      <li>{note.content}</li>
      <button onClick={togglrImportance}>{lable}</button>
    </>
  )
}

export default Note
