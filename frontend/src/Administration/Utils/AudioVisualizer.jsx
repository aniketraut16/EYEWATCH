import React, { useEffect, useRef } from "react";

function AudioVisualizer({ audioSrc }) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    const ctx = canvas.getContext("2d");

    if (!audioContextRef.current) {
      // Create AudioContext and AnalyserNode if they don't exist
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();

      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      analyser.fftSize = 256;
    }

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    draw();

    return () => {
      audioContextRef.current.close();
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width="800" height="300"></canvas>
      <audio ref={audioRef} src={audioSrc} controls></audio>
    </div>
  );
}

export default AudioVisualizer;
