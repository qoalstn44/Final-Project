import { useState, useEffect } from "react";

interface News {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const NewsPage= () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        ""
      );
      const data = await response.json();
      setNews(data.articles);
    };
    fetchNews();
  }, []);

  return (
    <div className="news-container">
      {news.map((article) => (
        <div className="news-item" key={article.title}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url}>Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;