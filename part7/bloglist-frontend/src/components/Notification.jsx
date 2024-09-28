import { useSelector } from "react-redux"

const Notification = ({ style }) => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  return <div style={style}>{notification}</div>
}

export default Notification
