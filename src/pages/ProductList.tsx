import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ChevronDown from "../assets/chevron-down.svg";
import adjustmentSvg from "../assets/adjustments-horizontal.svg";
import XIcon from "../assets/x-mark.svg";
import PaginationButton from "../components/PaginationButton";
import { getPaginationRange } from "../helpers/pagination";
import Input from "../components/Input";
import Button from "../components/Button";

type Product = {
  id: number;
  name: string;
  cover_image: string;
  price: number;
};

type ApiResponse = {
  data: Product[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    to: number;
    from: number;
  };
};

const API_URL = "https://api.redseam.redberryinternship.ge/api" + "/products";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [appliedPriceFrom, setAppliedPriceFrom] = useState("");
  const [appliedPriceTo, setAppliedPriceTo] = useState("");
  const [meta, setMeta] = useState<ApiResponse["meta"] | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const sortLabels: Record<string, string> = {
    created_at: "New Products first",
    price: "Price: low to high",
    "-price": "Price: high to low",
  };

  const fetchProducts = async (options?: {
    resetPage?: boolean;
    fromClear?: boolean;
  }) => {
    try {
      const res = await axios.get<ApiResponse>(API_URL, {
        params: {
          page: options?.resetPage ? 1 : page,
          sort,
          "filter[price_from]": appliedPriceFrom || undefined,
          "filter[price_to]": appliedPriceTo || undefined,
        },
        headers: { Accept: "application/json" },
      });
      setProducts(res.data.data);
      setMeta(res.data.meta);
      if (options?.resetPage) setPage(1);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, sort, appliedPriceFrom, appliedPriceTo]);

  const handleFilter = () => {
    setAppliedPriceFrom(priceFrom);
    setAppliedPriceTo(priceTo);
    setShowFilter(false);
    setPage(1);
  };

  const clearPriceFilter = () => {
    setAppliedPriceFrom("");
    setAppliedPriceTo("");
    setPriceFrom("");
    setPriceTo("");
    setPage(1);
  };

  return (
    <div className="px-[100px] py-10">
      {/* Filters + Sorting */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-primary text-[2.625rem] font-semibold">Products</h2>

        <div className="flex items-center gap-8">
          {/* Showing results */}
          {meta && (
            <span className="text-sm text-gray-500">
              Showing {meta.from} - {meta.to} of {meta.total} results
            </span>
          )}

          <span className="w-[14px] h-[0px] border border-grey-2 rotate-90"></span>

          {/* Filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilter((s) => !s)}
              className="flex items-center gap-2 text-primary cursor-pointer"
            >
              <img src={adjustmentSvg} className="w-6 h-6" />
              <span>Filter</span>
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 bg-white border border-grey-2 rounded-lg p-4 z-10">
                <p className="text-primary font-semibold capitalize">
                  select price
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="From"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="To"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                  />
                </div>
                <div className="mt-[10px] flex justify-end">
                  <Button
                    variant="primary"
                    onClick={handleFilter}
                    className="text-sm px-[2.625rem] py-[10px] capitalize"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </div>

          <span className="w-[14px] h-[0px] border border-grey-2 rotate-90"></span>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSort((s) => !s)}
              className="flex items-center gap-1 text-primary cursor-pointer"
            >
              <span>{sortLabels[sort] || "Sort by"}</span>
              <img src={ChevronDown} className="w-4 h-4" />
            </button>

            {showSort && (
              <div className="absolute right-0 mt-2 py-4 bg-white border border-grey-2 rounded-lg z-10 w-56">
                <p className="px-4 text-primary font-semibold">Sort by</p>
                <ul className="mt-2 flex flex-col text-primary">
                  {Object.entries(sortLabels).map(([key, label]) => (
                    <li
                      key={key}
                      onClick={() => {
                        setSort(key);
                        setShowSort(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active filters */}
      {(appliedPriceFrom || appliedPriceTo) && (
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-[6px] border border-grey-2 px-4 py-2 text-secondary rounded-full text-[0.875rem]">
            <span>
              price:{" "}
              {appliedPriceFrom && appliedPriceTo
                ? `${appliedPriceFrom}-${appliedPriceTo}`
                : appliedPriceFrom
                ? `from ${appliedPriceFrom}`
                : `to ${appliedPriceTo}`}
            </span>
            <button
              onClick={clearPriceFilter}
              className="flex items-center justify-center w-4 h-4"
            >
              <img src={XIcon} className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="overflow-hidden hover:shadow-md transition"
          >
            <img
              src={product.cover_image}
              alt={product.name}
              className="w-full rounded-[10px] object-cover"
            />
            <div className="mt-3">
              <h3 className="text-primary text-[1.125rem] font-medium capitalize">
                {product.name}
              </h3>
              <p className="text-primary font-medium mt-[2px]">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-[6px] rounded disabled:opacity-50 cursor-pointer"
          >
            <img src={ChevronDown} className="rotate-90 w-5 h-5" />
          </button>

          {getPaginationRange(page, meta.last_page).map((p, i) =>
            p === "..." ? (
              <span
                key={`dots-${i}`}
                className="px-2 text-dark-grey-400 select-none"
              >
                ...
              </span>
            ) : (
              <PaginationButton
                key={p}
                label={p}
                active={page === p}
                onClick={() => setPage(Number(p))}
              />
            )
          )}

          <button
            disabled={page === meta.last_page}
            onClick={() => setPage((p) => p + 1)}
            className="px-[6px] rounded disabled:opacity-50 cursor-pointer"
          >
            <img src={ChevronDown} className="-rotate-90 w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
