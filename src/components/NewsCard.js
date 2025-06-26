import React, { useEffect, useState } from 'react';

const NewsCard = () => {
    const apiKey = process.env.REACT_APP_NEWS_KEY;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = `https://newsapi.org/v2/top-headlines?q=Weather&sortBy=publishedAt&apiKey=${apiKey}`;

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch news");
                }
                return res.json();
            })
            .then((data) => {
                setArticles(data.articles);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="news-card">
            {loading && <p>Loading news...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {articles.length > 0 &&
                articles.map((news) => (
                    <div className="news-preview" key={news.url}>
                        <a href={news.url} target="_blank" rel="noopener noreferrer">
                            <h2>{news.title}</h2>
                            <p>{news.source.name}</p>
                            <p>Written by: {news.author || "Unknown"}</p>
                        </a>
                    </div>
                ))}
        </div>
    );
};

export default NewsCard;
