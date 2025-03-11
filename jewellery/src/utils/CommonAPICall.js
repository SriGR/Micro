
export default async function CommonPOSTAPICall({url,params}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        const data = await response.json();
        return data;
    } catch (err) {
        // console.error("Error in CommonAPiCall:", err.message);
        return [];
    }
    
}