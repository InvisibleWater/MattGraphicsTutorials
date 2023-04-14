var noisePlayer = new EffectPlayer(NoiseAnimation, 192, 192);

noisePlayer.load(Promise.resolve(true));
noisePlayer.render(document.getElementById("container"))