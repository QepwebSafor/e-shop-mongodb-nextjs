interface MenuIemProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MenuItem: React.FC<MenuIemProps> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition"
    >
      {children}
    </div>
  );
};

export default MenuItem;
