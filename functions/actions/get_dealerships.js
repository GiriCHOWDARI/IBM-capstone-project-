/**
 * Get all dealerships
 */

const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

const COUCH_URL = "https://f0d99e05-c0be-4951-abcd-dd4b0bfd945e-bluemix.cloudantnosqldb.appdomain.cloud";
const IAM_API_KEY = "QSbAPGRyYI0GLy7YLOa4sno-BRcdoJB1Qh6Di9Ogq897";

function main() {
    const authenticator = new IamAuthenticator({ apikey: IAM_API_KEY });
    const cloudant = CloudantV1.newInstance({
        authenticator: authenticator
    });
    
    cloudant.setServiceUrl(COUCH_URL);

    let dealerships = getAllRecords(cloudant, 'dealerships');
    
    return dealerships;
}

function getAllRecords(cloudant, dbname) {
    return new Promise((resolve, reject) => {
        cloudant.postAllDocs({ db: dbname, includeDocs: true, limit: 10 })
            .then((result) => {
                resolve({ result: result.result.rows });
            })
            .catch(err => {
                console.error(err);
                reject({ err: err });
            });
    });
}