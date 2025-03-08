// components/GuessTheLyrics.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio'; // For parsing HTML lyrics

interface Song {
  startingLyrics: string;
  correctContinuation: string;
}

const GENIUS_API_TOKEN = 'tht10d4bHrIWneyAK_k0kay_4T8MU4It8Emwot6mHXI2XVsZW8ar8OeZ8ae1BBrE'; 

const GuessTheLyrics = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomSong();
  }, []);

  // Fetch lyrics from the Genius page
  const fetchLyrics = async (songUrl: string) => {
    try {
      const response = await axios.get(songUrl);
      const $ = cheerio.load(response.data);

      // Extract lyrics from the page (Genius stores lyrics in a div with class "lyrics")
      const lyrics = $('.lyrics').text().trim();
      return lyrics;
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      return null;
    }
  };

  // Fetch a random song and its lyrics
  const fetchRandomSong = async () => {
    setLoading(true);
    try {
      // Step 1: Search for a random song
      const searchResponse = await axios.get(`https://api.genius.com/search?q=popular`, {
        headers: {
          Authorization: `Bearer ${GENIUS_API_TOKEN}`,
        },
      });

      // Step 2: Pick a random song from the search results
      const randomSong =
        searchResponse.data.response.hits[Math.floor(Math.random() * searchResponse.data.response.hits.length)].result;
      const songUrl = randomSong.url;

      // Step 3: Fetch the lyrics from the Genius page
      const lyrics = await fetchLyrics(songUrl);

      if (!lyrics) {
        throw new Error('Failed to fetch lyrics');
      }

      // Step 4: Parse lyrics into lines
      const lines = lyrics.split('\n').filter((line) => line.trim() !== '');

      // Step 5: Set the starting lyrics and correct continuation
      const startingLyrics = lines[0];
      const correctContinuation = lines[1];

      setCurrentSong({ startingLyrics, correctContinuation });
    } catch (error) {
      console.error('Error fetching song:', error);
      setFeedback('Failed to load song. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!currentSong) return;

    if (userInput.trim().toLowerCase() === currentSong.correctContinuation.toLowerCase()) {
      setFeedback('Correct! 🎉');
      setScore(score + 1);
    } else {
      setFeedback(`Incorrect. The correct continuation is: "${currentSong.correctContinuation}"`);
    }
  };

  const nextSong = () => {
    fetchRandomSong();
    setUserInput('');
    setFeedback('');
  };

  if (loading) {
    return <p>Loading song...</p>;
  }

  if (!currentSong) {
    return <p>Failed to load song. Please try again.</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Continue the Lyric Game</h1>
      <p>Score: {score}</p>
      <div style={{ margin: '20px 0' }}>
        <p>{currentSong.startingLyrics}</p>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Continue the lyrics..."
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={handleSubmit} style={{ padding: '10px', marginLeft: '10px' }}>
        Submit
      </button>
      <div style={{ margin: '20px 0' }}>
        <p>{feedback}</p>
      </div>
      <button onClick={nextSong} style={{ padding: '10px' }}>
        Next Lyric
      </button>
    </div>
  );
};

export default GuessTheLyrics;