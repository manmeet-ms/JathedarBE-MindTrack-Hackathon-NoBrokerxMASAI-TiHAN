import * as prismic from '@prismicio/client'
import 'dotenv/config'
import conf from '../../../../src/conf/conf.js';


export const createClient = (config = {}) => {
const client = prismic.createClient('Chronos Content Management', {
    accessToken: conf.prismicPermanentAccessTokensMaster,
});

return client
};