import { Link, useLocation } from 'react-router-dom';
import { bottombarLinks } from '@/constants';
const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottombar">
      {bottombarLinks.map((link) => {
        const isActive: boolean = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={` ${isActive && 'bg-indigo-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`${isActive && 'filter invert brightness-0'}`}
            />
            <p className="tiny-medium text-white">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
