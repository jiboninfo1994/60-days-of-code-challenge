import CategoriesTable from '../components/CategoriesTable';
import CategoryForm from '../components/CategoryForm';
import UserForm from '../components/UserForm';

const Home = () => {
  return (
    <section className="py-16">
      <div className="xl:container mx-auto">
        <div className="flex mb-4 flex-wrap">
          <div className="w-1/2">
            <CategoryForm />
          </div>
          <div className="w-1/2">
            <CategoriesTable />
          </div>
          <div className="w-1/2">
            <UserForm />
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
    </section>
  );
};

export default Home;
