import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  crateTag,
  deleteTag,
  getTags,
  tagsReducerState,
  updateTag
} from '../app/reducers/tags/tagsSlice';
import moment from 'moment';
import PostSection from '../components/PostSection';
import TagForm from '../components/tags/TagForm';
import ListTable from '../components/ListTable';

const About = () => {
  const [tagName, setTagName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editableTag, setEditableTag] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, isError, tags } = useSelector(tagsReducerState);

  // Handle change
  const handleChange = (e) => {
    setTagName(e.target.value);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tagName) {
      return alert('Tag name field is required!');
    }
    const timeStamp = moment.utc().toISOString();

    const newTag = {
      id: Date.now() + '',
      name: tagName,
      created_at: timeStamp,
      updated_at: timeStamp
    };

    if (editMode) {
      dispatch(updateTag({ tagName, editableTag }));
      setEditMode(false);
      setEditableTag(null);
      setTagName('');
    } else {
      dispatch(crateTag(newTag));
      setTagName('');
    }
  };

  // Handle Edit
  const handleEdit = (tag) => {
    setEditMode(true);
    setEditableTag(tag);
    setTagName(tag.name);
  };

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  return (
    <section className="py-16">
      <div className="xl:container mx-auto">
        <div className="flex mb-4 flex-wrap">
          <div className="w-1/3 px-7">
            <PostSection />
          </div>
          <div className="w-2/3">
            <div className="flex flex-col gap-16">
              <TagForm
                tagName={tagName}
                setTagName={setTagName}
                onHandleChange={handleChange}
                onHandleSubmit={handleSubmit}
                editMode={editMode}
              />
              <ListTable
                lists={tags}
                isLoading={isLoading}
                isError={isError}
                created_at={true}
                updatedAt={true}
                onDeleteHandler={deleteTag}
                onEditHandler={handleEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
