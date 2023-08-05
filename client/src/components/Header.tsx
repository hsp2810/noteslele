import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='text-black cursor-pointer body-font uppercase bg-slate-100'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-center'>
        <nav className='flex flex-wrap items-center text-base justify-center'>
          <Link to={"/all"} className='mr-5 hover:text-gray-900'>
            all notes
          </Link>
          <Link to={"/create"} className='mr-5 hover:text-gray-900'>
            create
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
