const buttonStyles = {
  draw: { style: "btn btn-success"},
  deck: { style: "btn btn-primary"},

};

type ButtonType = keyof typeof buttonStyles;
type ButtonProps = {
  handleClick: () => void;
  buttonType: ButtonType;
  children?: React.ReactNode;
};


const Button: React.FC<ButtonProps> = ({ handleClick, buttonType, children }) => {
  const {style} = buttonStyles[buttonType]
  return <button onClick={handleClick} className={style}>{children}</button>;
};

export default Button;
