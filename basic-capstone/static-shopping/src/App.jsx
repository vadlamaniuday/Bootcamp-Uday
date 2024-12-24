import { useState, useEffect } from "react";
import { Search, ShoppingCart, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import productsData from "./assets/data.json";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setProducts(productsData);
      setFilteredProducts(productsData);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    let results = products;

    if (term) {
      const searchTerms = term.toLowerCase().split(" ");
      results = products.filter((product) =>
        searchTerms.every(
          (term) =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        )
      );
    }

    if (selectedCategory) {
      results = results.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(results);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    let results = products;

    if (category) {
      results = results.filter((product) => product.category === category);
    }

    if (searchTerm) {
      const terms = searchTerm.toLowerCase().split(" ");
      results = results.filter((product) =>
        terms.every(
          (term) =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        )
      );
    }

    setFilteredProducts(results);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const categories = ["Electronics", "Books", "Clothing", "Home"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Serverless Store</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <button className="relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter size={20} className="mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded ${
                      selectedCategory === ""
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleCategoryFilter("")}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`w-full text-left px-3 py-2 rounded ${
                        selectedCategory === category
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleCategoryFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-3">
            {isLoading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            ${product.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            Rating: {product.rating}★
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
