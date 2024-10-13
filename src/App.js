import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Slider, Switch } from '@mui/material';

const sounds = [
  { key: 'Q', src: '/Heater-1.mp3', display: 'Heater 1' },
  { key: 'W', src: '/Heater-2.mp3', display: 'Heater 2' },
  { key: 'E', src: '/Heater-3.mp3', display: 'Heater 3' },
  { key: 'A', src: '/Heater-4.mp3', display: 'Heater 4' },
  { key: 'S', src: '/Clap.mp3', display: 'Clap' },
  { key: 'D', src: '/Open-HH.mp3', display: 'Open HH' },
  { key: 'Z', src: '/Kick_n_Hat.mp3', display: "Kick n' Hat" },
  { key: 'X', src: '/Kick.mp3', display: 'Kick' },
  { key: 'C', src: '/Closed-HH.mp3', display: 'Closed HH' },
];

function DrumMachine() {
  const [display, setDisplay] = useState('');
  const [volume, setVolume] = useState(0.5);
  const [power, setPower] = useState(true);

  const playSound = (key, displayText) => {
    if (power) {
      const audio = document.getElementById(key);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play().catch((e) => console.error('Playback failed', e));
        setDisplay(displayText);
      }
    }
  };

  const handleKeyPress = (e) => {
    const sound = sounds.find((s) => s.key === e.key.toUpperCase());
    if (sound) playSound(sound.key, sound.display);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [power]);

  return (
    <Box
      id="drum-machine"
      sx={{
        backgroundColor: '#888',
        padding: 4,
        borderRadius: 2,
        textAlign: 'center',
        maxWidth: { xs: '90%', sm: '600px' },
        width: '100%',
        margin: '0 auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '3px solid orange',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Drum Machine
        </Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption">Power</Typography>
          <Switch
            checked={power}
            onChange={() => setPower(!power)}
            color="primary"
          />
        </Box>
      </Box>

      <Box
        id="display"
        sx={{
          backgroundColor: '#555',
          color: '#FFF',
          height: '50px',
          marginBottom: '20px',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">{display || 'Hit a Pad!'}</Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: 20,
          justifyItems: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        {sounds.map((sound) => (
          <Button
            id={sound.display}
            key={sound.key}
            className="drum-pad"
            onClick={() => playSound(sound.key, sound.display)}
            variant="contained"
            color="secondary"
            sx={{
              width: '80px',
              height: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 1,
              backgroundColor: '#777',
            }}
          >
            {sound.key}
            <audio className="clip" id={sound.key} src={sound.src}></audio>
          </Button>
        ))}
      </Box>

      <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <Slider
          value={volume * 100}
          onChange={handleVolumeChange}
          aria-labelledby="volume-slider"
          step={1}
          min={0}
          max={100}
          sx={{ color: 'blue' }}
        />
      </Box>
    </Box>
  );
}

export default DrumMachine;