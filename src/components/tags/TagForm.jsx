const TagForm = ({ onHandleSubmit, tagName, onHandleChange, editMode }) => {
  return (
    <form className="flex items-end gap-5" onSubmit={onHandleSubmit}>
      <div className="flex flex-col gap-3">
        <label>Tag</label>
        <input
          type="text"
          value={tagName}
          placeholder="Tag name..."
          className="input input-bordered w-full max-w-xs"
          onChange={onHandleChange}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        {editMode ? 'Update Tag' : 'Add Tag'}
      </button>
    </form>
  );
};

export default TagForm;
