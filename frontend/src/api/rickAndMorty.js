const URL_BASE = 'https://futuramaapi.com/api'

export async function getCharacters() {
    const url = URL_BASE + '/characters'
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Deu ruim')
    }
    const data = await response.json()
    console.log(data)
    return data.items
}