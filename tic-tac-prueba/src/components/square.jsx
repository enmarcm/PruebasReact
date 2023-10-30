import './square.css'
const Square = ({ update, children , index, isActive}) => {
  const handleClick = () => update(index);

  const active = isActive ? 'is-active' : ''

  return (
    <div className={`square-container ${active}`}>
      <div className="content" onClick={handleClick}>
        {children}
      </div>
    </div>
  );
};

export default Square
