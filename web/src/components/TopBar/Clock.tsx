import { useDesktop } from '../../contexts/DesktopContext';

function Clock() {
  const { state } = useDesktop();

  const formatTime = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const minutesStr = minutes.toString().padStart(2, '0');

    return `${dayName} ${monthName} ${day} ${hours}:${minutesStr} ${ampm}`;
  };

  return <span>{formatTime(state.systemTime)}</span>;
}

export default Clock;
