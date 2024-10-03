import CustomSelectBox from '../CustomSelectBox';

const BlogFilter = ({
  categories,
  tags,
  users,
  onHandleSubmit,
  onHandleChange,
  filterValue
}) => {
  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <div className="px-7 mb-12 flex gap-4">
          {categories && categories.length > 0 && (
            <select
              name="category"
              // value={filterValue.category}
              value={filterValue.category ?? ''}
              // defaultValue={selectedCatId}
              className="select select-bordered w-full max-w-xs"
              onChange={onHandleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option
                  value={category.id}
                  key={category.id}
                  // selected={category.id === selectedCatId}
                >
                  {category.name}
                </option>
              ))}
            </select>
          )}
          {users && users.length > 0 && (
            <select
              // disabled={!filterValue?.category}
              name="author"
              value={filterValue.author}
              className="select select-bordered w-full max-w-xs"
              onChange={onHandleChange}
            >
              <option value="">Select Author</option>
              {users?.map((author) => (
                <option value={author.id} key={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          )}
          {tags && tags.length > 0 && (
            <select
              name="tag"
              value={filterValue.tag}
              className="select select-bordered w-full max-w-xs"
              onChange={onHandleChange}
            >
              <option value="">Select Tag</option>
              {tags.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          )}

          <input
            name="search"
            value={filterValue.search}
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs"
            onChange={onHandleChange}
          />
          <button className="btn btn-primary">Filter</button>
        </div>
      </form>
      {/* <div className="flex gap-10">
        <CustomSelectBox data={tags} multiselect={false} />
        <CustomSelectBox data={tags} />
      </div> */}
    </>
  );
};

export default BlogFilter;
