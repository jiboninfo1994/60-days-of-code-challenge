import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Pagination = ({ dispatchURL, totalItems }) => {
  const [postPerpage, setPostPerpage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchURL({ postPerpage, currentPage }));
    setTotalPages(Math.ceil(totalItems / postPerpage));
  }, [dispatch, dispatchURL, currentPage, postPerpage, totalItems]);

  console.log(totalPages);

  return (
    <div className="join">
      {Array.from({ length: totalPages }, (_, index) => {
        return (
          <button key={index} className="join-item btn">
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
