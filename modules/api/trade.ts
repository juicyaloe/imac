export async function getTrades() {
    let response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + 'api/trades/', {
        headers: {
            Authorization: 'Token ' + process.env.NEXT_PUBLIC_TOKEN,
        },
    });

    if (response.status == 200) {
        return response.json();
    } else {
        return null;
    }
}
