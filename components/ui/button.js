import Link from 'next/link';
import styles from './button.module.css';

const Button = (props) => {
  const { children, link, onClick } = props;

  if (!link) {
    return (
      <button className={styles.btn} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <Link href={link}>
      <a className={styles.btn}>{children}</a>
    </Link>
  );
};

export default Button;