import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/Listings/Listings";
import Bot from "../components/Bot";

export default function Carpage() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    condition: "all",
    year: "",
    type: "all",
    brand: "",
    sort: "created_at",
    order: "desc",
  });
  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const conditionFromUrl = urlParams.get("condition");
    const yearFromUrl = urlParams.get("year");
    const brandFromUrl = urlParams.get("brand");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      conditionFromUrl ||
      yearFromUrl ||
      brandFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        condition: conditionFromUrl || "all",
        year: yearFromUrl || "",
        brand: brandFromUrl || "",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();

    const fetchBrands = async () => {
      setLoading(true);
      // setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/brands`);
      const data = await res.json();
      // console.log(data);
      setBrands(data.brands);
      setLoading(false);
    };

    fetchBrands();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "type") {
      setSidebardata({ ...sidebardata, type: e.target.value });
    }

    if (e.target.id === "condition") {
      setSidebardata({ ...sidebardata, condition: e.target.value });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === "brand") {
      setSidebardata({ ...sidebardata, brand: e.target.value });
    }
    if (e.target.id === "year") {
      setSidebardata({ ...sidebardata, year: e.target.value });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("condition", sidebardata.condition);
    urlParams.set("brand", sidebardata.brand);
    urlParams.set("year", sidebardata.year);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length > 8) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
    setListings(data);
    setLoading(false);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
    console.log(listings);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <Bot />
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-8">
          {/* <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Name:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div> */}
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Brand:</label>
            <select
              id="brand"
              value={sidebardata.brand}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Year:</label>
            <select
              id="year"
              value={sidebardata.year}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
            >
              <option value="">Select a year</option>
              {Array.from({ length: 2026 - 1998 }, (_, index) => (
                <option key={1998 + index} value={1998 + index}>
                  {1998 + index}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Type:</label>
            <select
              onChange={handleChange}
              value={sidebardata.type}
              id="type"
              className="border rounded-lg p-3 dark:text-black"
            >
              <option value="suv">Suv</option>
              <option value="sedan">Sedan</option>
              <option value="all">All</option>
            </select>
          </div>

          {/* condition */}
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Condition:</label>
            <select
              onChange={handleChange}
              value={sidebardata.condition}
              id="condition"
              className="border rounded-lg p-3 dark:text-black"
            >
              <option value="new">Brand New</option>
              <option value="used">Direct Belguim</option>
              <option value="all">All</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3 dark:text-black"
            >
              <option value="price_desc">Price high to low</option>
              <option value="price_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5 dark:text-white">
          Show Room
        </h1>

        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">
              Product not listed yet, contact us to place your order
            </p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full dark:text-white">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
