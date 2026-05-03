const portraitModules = import.meta.glob('../assets/portrait_*.png', {
    eager: true,
    import: 'default'
});

export function getCharacterPortraitUrl(characterName) {
    if (!characterName) return null;

    const normalizedName = characterName.toLowerCase().replace(/\s+/g, '_');
    const key = `../assets/portrait_${normalizedName}.png`;

    return portraitModules[key] || null;
}
