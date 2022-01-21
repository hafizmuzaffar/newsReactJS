import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Container from '../components/Container';
import Loading from '../components/Loading';
import Error from '../components/Error';
import NewsList from '../components/NewsList';

import { getNews } from '../services/getNews';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const DEFAULT_SEARCH_QUERY = 'microsoft';

  useEffect(() => {
    const fetchTechNews = async () => {
      setLoading(true);

      const res = await getNews({
        searchQuery: id || DEFAULT_SEARCH_QUERY,
      });

      if (!res) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
      setArticles(res.articles);
    };
    fetchTechNews();
  }, [id]);

  return (
    <>
      <Navbar />
      <Container>
        {loading && <Loading />}
        {error && <Error />}
        {!loading && articles.length > 0 && <NewsList articles={articles} />}
      </Container>
    </>
  );
}

export default App;
