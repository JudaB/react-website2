import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const SongQuizForm = () => {
  const [songData, setSongData] = useState(null);
  const [feedback, setFeedback] = useState('');
  const { register, handleSubmit, errors } = useForm({
    validationSchema: Yup.object().shape({
      song_name: Yup.string().required('Song name is required'),
      scale: Yup.string().required('Scale is required'),
    }),
  });

  useEffect(() => {
    // Fetch the correct song data from your API endpoint
    fetch('https://m5wll42zrj.execute-api.us-east-1.amazonaws.com/prod/insert')
      .then(response => response.json())
      .then(data => setSongData(data))
      .catch(error => console.error('Error fetching song data:', error));
  }, []);

  const onSubmit = (data) => {
    if (songData && data.song_name === songData.song_name && data.scale === songData.scale) {
      setFeedback('Correct');
    } else {
      setFeedback('Wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Song Name</label>
        <input name="song_name" ref={register} />
        {errors.song_name && <p>{errors.song_name.message}</p>}
      </div>
      <div>
        <label>Scale</label>
        <input name="scale" ref={register} />
        {errors.scale && <p>{errors.scale.message}</p>}
      </div>
      <button type="submit">Submit</button>
      {feedback && <p>{feedback}</p>}
    </form>
  );
};

export default SongQuizForm;

