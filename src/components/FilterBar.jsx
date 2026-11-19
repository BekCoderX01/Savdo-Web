import { CloseIcon, HeartIcon } from "./Icons";

function FilterBar({
  selectedCategory = "Hammasi",
  onCategoryChange,
  onlyLiked = false,
  onToggleOnlyLiked,
  sortBy = "default",
  onSortChange,
  searchQuery = "",
  onClearSearch,
  resultsCount = 0,
}) {
  const categories = ["Hammasi", "Noutbuklar", "Audio", "Aksessuarlar"];

  return (
    <section className="filter-bar" aria-label="Mahsulotlarni saralash">
      <div className="filter-categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-tab ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => onCategoryChange?.(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="filter-controls">
        {searchQuery.trim() !== "" && (
          <button
            type="button"
            className="search-chip"
            onClick={onClearSearch}
            title="Qidiruvni tozalash"
          >
            <span>“{searchQuery.trim()}”</span>
            <CloseIcon />
          </button>
        )}

        <button
          type="button"
          className={`wishlist-toggle ${onlyLiked ? "active" : ""}`}
          onClick={onToggleOnlyLiked}
        >
          <HeartIcon filled={onlyLiked} />
          <span>Faqat sevimlilar</span>
        </button>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange?.(e.target.value)}
        >
          <option value="default">Saralash: Standart</option>
          <option value="price-asc">Narx: Arzondan qimmatga</option>
          <option value="price-desc">Narx: Qimmatdan arzonga</option>
        </select>

        <span className="results-count">{resultsCount} ta mahsulot</span>
      </div>
    </section>
  );
}

export default FilterBar;
