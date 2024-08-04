const Note = ({ note, togglrImportance }) => {
  const lable = note.important ? "make not important" : "make important"

  return (
    <>
      <li className="note">
        {note.content} <button onClick={togglrImportance}>{lable}</button>
      </li>
    </>
  )
}

export default Note
