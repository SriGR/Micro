
export default async function CommonGETAPICall({url}) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        // console.error("Error in CommonAPiCall:", err.message);
        return [];
    }
    
}