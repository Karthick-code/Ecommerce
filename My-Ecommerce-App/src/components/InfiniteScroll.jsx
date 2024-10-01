import { useEffect } from 'react';

const InfiniteScroll = ({ onLoadMore }) => {
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (bottomReached) onLoadMore();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onLoadMore]);

  return null;
};

export default InfiniteScroll;
