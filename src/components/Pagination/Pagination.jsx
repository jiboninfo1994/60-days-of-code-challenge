const Pagination = ({ totalPages, onSetCurrentPage, currentPage }) => {
  const handlePagination = (pageNo, action) => {
    switch (action) {
      case 'current_page': {
        console.log('hello');

        onSetCurrentPage(pageNo);
        return;
      }
      case 'next_page': {
        if (currentPage < totalPages) {
          onSetCurrentPage(currentPage + 1);
        }

        return;
      }
      case 'previous_page': {
        if (currentPage > 1) {
          onSetCurrentPage(currentPage - 1);
        }

        return;
      }
      case 'first_page': {
        onSetCurrentPage(1);

        return;
      }
      case 'last_page': {
        onSetCurrentPage(totalPages);

        return;
      }
    }
  };

  const getVisiblePages = () => {
    const visiblePages = 5;
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePageNumbers = getVisiblePages();
  console.log(visiblePageNumbers);

  return (
    <div className="join">
      <button
        disabled={currentPage === 1}
        className="join-item btn"
        onClick={() => handlePagination(null, 'first_page')}
      >
        First Page
      </button>
      <button
        disabled={currentPage === 1}
        className="join-item btn"
        onClick={() => handlePagination(null, 'previous_page')}
      >
        Previous
      </button>
      {visiblePageNumbers &&
        visiblePageNumbers?.map((page) => {
          return (
            <button
              key={page}
              className={`join-item btn ${
                currentPage === page ? 'btn-active' : ''
              }`}
              onClick={() => handlePagination(page, 'current_page')}
            >
              {page}
            </button>
          );
        })}
      <button
        disabled={currentPage === totalPages}
        className="join-item btn"
        onClick={() => handlePagination(null, 'next_page')}
      >
        Next
      </button>
      <button
        disabled={currentPage === totalPages}
        className="join-item btn"
        onClick={() => handlePagination(null, 'last_page')}
      >
        Last Page
      </button>
    </div>
  );
};

export default Pagination;
