const CategoryForm = ({ catName, setCatName, editMode, handleSubmit }) => {
  //   console.log('editableNote', editableCat);
  return (
    <form className="flex items-end gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label>Category</label>
        <input
          type="text"
          value={catName}
          placeholder="Category name..."
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setCatName(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        {editMode ? 'Update Category' : 'Add Category'}
      </button>
    </form>
  );
};

export default CategoryForm;
