export default function FloatingActionButton({children, label, onClick}) {
    return (
        <button aria-label={label} className="fab" onClick={onClick}>
            {children}
        </button>
    );
}
