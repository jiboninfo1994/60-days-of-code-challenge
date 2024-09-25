import moment from 'moment';
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
  const formattedDate = moment(getDate).format('DD MMM YYYY hh:mm A');
  return formattedDate;
};
