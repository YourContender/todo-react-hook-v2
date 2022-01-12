import s from './Header.module.css';

function Header() {
    return (
        <div className={s.header}>
            <h1 className={s.title}>Todo-list (version2)</h1>
        </div>
    )
}

export default Header;