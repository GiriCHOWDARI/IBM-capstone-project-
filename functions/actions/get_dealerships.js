async function main(params) {
    const cloudant = Cloudant({
        url: params.COUCH_URL,
        plugins: { iamauth: { iamApiKey: params.IAM_API_KEY } }
    });

    try {
        // Access the "dealerships" database
        const dealershipDB = cloudant.use('dealerships');

        // Retrieve all documents from the "dealerships" database
        let allDocs = await dealershipDB.list({ include_docs: true }); // include_docs:true fetches the documents

        // Extract the documents from the response
        const dealerships = allDocs.rows.map(row => row.doc);

        return { "dealerships": dealerships };
    } catch (error) {
        return { error: error.description };
    }
}