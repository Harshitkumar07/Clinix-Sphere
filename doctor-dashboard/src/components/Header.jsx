import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">
          Welcome back, {user?.name?.replace('Dr. ', '')}
        </h1>
        <p className="text-xs md:text-sm text-gray-600 truncate">{user?.specialty}</p>
      </div>
      <div className="flex items-center space-x-2 md:space-x-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
          <p className="text-xs text-gray-600 truncate">{user?.email}</p>
        </div>
        <div className="w-10 h-10 bg-primary-100 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
          {user?.profilePhoto ? (
            <img
              src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${user.profilePhoto}`}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-primary-600" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
