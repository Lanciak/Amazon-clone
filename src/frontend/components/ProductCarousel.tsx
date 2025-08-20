
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "../types";

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const currentScroll = container.scrollLeft;
    const targetScroll = direction === "right" 
      ? currentScroll + scrollAmount 
      : currentScroll - scrollAmount;
    
    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < 
      container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Initialize arrows visibility
      handleScroll();
      
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [products]);

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <div className="relative">
        {showLeftArrow && (
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-1 z-10"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth"
          onScroll={handleScroll}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-[160px] sm:w-[200px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {showRightArrow && (
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-1 z-10"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
