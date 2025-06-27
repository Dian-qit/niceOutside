import { useFetch } from "../hooks/useFetch";

const NewsCard = () => {
    const apiKey = process.env.REACT_APP_NEWS_KEY;
    const url = `https://gnews.io/api/v4/search?q=Weather&lang=en&country=ph&max=10&apikey=${apiKey}`;
    
    const { data, loading, error } = useFetch(url);
    const articles = data?.articles || [];

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
                            <p>{news.source.url}</p>
                        </a>
                    </div>
                ))}
        </div>
    );
}
 
export default NewsCard;