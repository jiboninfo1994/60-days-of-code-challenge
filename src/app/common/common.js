import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleApiError = (error, customErrorMessage) => {
  console.log(error.response);
  if (error.response) {
    const { statusCode, message } = error.response.data;

    console.log(error.response);

    if (customErrorMessage) {
      toast.error(customErrorMessage);
    } else if (statusCode == 412) {
    } else if (statusCode !== 401) {
      if (Array.isArray(message)) {
        toast.error(message.join(', '));
      } else {
        toast.error(message);
      }
    }
    return error.response.data;
  }

  if (error.request) {
    // toast.error("Network error");
    return { message: 'Network error' };
  }
  throw error;
};

export const formatDate = (getDate) => {
  const date = new Date(getDate);
  const day = date.getDate(),
    month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ][date.getMonth()];
  const suffix =
    day > 3 && day < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : day % 10];
  const hours = date.getHours() % 12 || 12,
    ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${day}${suffix} ${month}, ${date.getFullYear()} ${hours}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')} ${ampm}`;
};
