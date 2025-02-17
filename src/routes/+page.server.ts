import type { PageServerLoad } from './$types';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import type { Episode } from '../types/Episode';

type TokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
}

const HTML_ALL_THE_THINGS_PODCAST_ID = '2MWqU5ZbO69jy3RZ74wgdM';

const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  


const getToken = async () => {
    const response = await fetch(authOptions.url, {
        method: 'POST',
        headers: authOptions.headers,
        body: new URLSearchParams(authOptions.form)
    }).catch(error => {
        console.error('Error fetching token:', error);
        return null;
    });

    const data = response instanceof Response ? await response.json() as TokenResponse : response;
    return data;
}

const getPodcast = async (token: string) => {
    const response = await fetch(`https://api.spotify.com/v1/shows/${HTML_ALL_THE_THINGS_PODCAST_ID}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        console.error('Error fetching podcast:', response.statusText);
        return null;
    }
    const data = await response.json();
    console.log(data);
    // get the first 5 episodes 
    const episodes: Episode[] = data.episodes.items.slice(0, 5);

    const podcast  = {
        name: data.name,
        episodes: episodes
    }

    return podcast;
}

export const load: PageServerLoad = async () => {
    const token = await getToken();
    if (!token) {
        return {
            message: `Error fetching token!`
        };
    }
    const podcast = await getPodcast(token.access_token);
    return {
        podcast
    };
}
