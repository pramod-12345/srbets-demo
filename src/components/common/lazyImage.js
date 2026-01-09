import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LazyImage = ({
  src,
  alt,
  className,
  placeholder,
  link,
  divClassName = "h-full",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className={`relative ${divClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-darkByzantineBlue rounded-xl md:rounded-[20px]">
          {placeholder || alt}
        </div>
      )}
      <Link to={link && isLoggedIn ? link : ""}>
        <img
          src={src}
          alt={alt}
          className={` transition-opacity duration-300 ${className} ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      </Link>
    </div>
  );
};

export default LazyImage;
