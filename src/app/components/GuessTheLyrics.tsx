// components/GuessTheLyrics.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface Song {
  startingLyrics: string;
  correctContinuation: string;
}

const GENIUS_API_TOKEN = 'TN_Hvv5Ho2WlDvKEfuqEWVR7NHkvCSBjv3CeIHmZyiePJ4emaJhUKkyb5YdGvlO2'; // Replace with your Genius API token

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

      // Updated selector for lyrics (as of October 2023)
      const lyricsContainer = $('[data-lyrics-container="true"]');
      if (!lyricsContainer.length) {
        throw new Error('Lyrics container not found');
      }

      // Extract and clean the lyrics
      let lyrics = '';
      lyricsContainer.each((i, el) => {
        lyrics += $(el).text().trim() + '\n';
      });

      return lyrics.trim();
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      return null;
    }
  };

  // Fetch a random song and its lyrics
  const fetchRandomSong = async () => {
    setLoading(true);
    try {
      // Step 1: Fetch popular songs from the Genius API
      const searchResponse = await axios.get(`https://api.genius.com/search?q=popular`, {
        headers: {
          Authorization: `Bearer ${GENIUS_API_TOKEN}`,
        },
      });

      console.log('Search Response:', searchResponse.data); // Debug: Check the search results

      // Step 2: Pick a random song from the search results
      const randomSong =
        searchResponse.data.response.hits[Math.floor(Math.random() * searchResponse.data.response.hits.length)].result;
      const songUrl = randomSong.url;

      console.log('Selected Song:', randomSong); // Debug: Check the selected song
      console.log('Song URL:', songUrl); // Debug: Check the song URL

      // Step 3: Fetch the lyrics from the Genius page
      const lyrics = await fetchLyrics(songUrl);

      if (!lyrics) {
        throw new Error('Failed to fetch lyrics');
      }

      console.log('Lyrics:', lyrics); // Debug: Check the fetched lyrics

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