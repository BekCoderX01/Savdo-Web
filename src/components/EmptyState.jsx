import { SearchIcon } from "./Icons";

function EmptyState({
  title = "Mahsulot topilmadi",
  description = "Qidiruv so‘rovi yoki tanlangan filtrlar bo‘yicha mos mahsulot topilmadi. Boshqa so‘z bilan urinib ko‘ring.",
  actionLabel = "Qidiruvni tozalash",
  onReset,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <SearchIcon size={26} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {onReset && (
        <button type="button" className="empty-state-btn" onClick={onReset}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
