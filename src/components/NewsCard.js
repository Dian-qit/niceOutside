import { useFetch } from "../hooks/useFetch";

const NewsCard = () => {
    const apiKey = process.env.REACT_APP_NEWS_KEY;
    const url = `https://gnews.io/api/v4/search?q=Weather&lang=en&country=ph&max=10&apikey=${apiKey}`;
    
    const { data, loading, error } = useFetch(url);
    const articles = data?.articles || [];

    return (
        <div className="news-card" id="news">
            {loading && <p>Loading news...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {articles.length > 0 &&
                articles.map((news) => (
                    <div className="news-preview" key={news.url}>
                        
                            <div className="news-preview-left" >
                                <img    
                                        src={news.image} 
                                        alt={news.title}
                                        className="news-preview-img"
                                    />
                            </div>
                            <a href={news.source.url} target="blank" className="news-preview-right" style={{Color: '#0000'}}>
                                <div className="news-preview-right-top">
                                    <h2 style={{
                                        fontSize: '16px',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,           // Limits to 3 lines
                                        WebkitBoxOrient: 'vertical',
                                        textOverflow: 'ellipsis',
                                        width: 'auto',
                                        margin: '0',
                                        height: 'auto',
                                        overflow: 'hidden'
                                        }}>{news.title}</h2>
                                    <p style={{
                                        fontSize: '12px',
                                        margin: '0',
                                        color: '#939599'
                                    }}>{news.source.name}</p>
                                </div>
                                <div className="news-preview-right-bottom">
                                    <p style={{
                                        fontSize: '12px',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,           // Limits to 3 lines
                                        WebkitBoxOrient: 'vertical',
                                        textOverflow: 'ellipsis',
                                        width: '250px',
                                        maxHeight: '80px',
                                        overflow: 'hidden',
                                        color: '#000'

                                    }}>{news.description}</p>
                                </div>
                            </a>
                        
                    </div>
                ))}
        </div>
    );
}
 
export default NewsCard;