'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const result = await super.create(ctx);
        console.log('result', result);
        const midtransClient = require('midtrans-client');
        // Create Snap API instance
        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: 'SB-Mid-server-8MjAwI-z8iSbZkbrqg7_v0-y',
            clientKey: 'SB-Mid-client-YjD3NM0k25yYB5JF'

        });

        let parameter = {
            "transaction_details": {
                "order_id": result.data.id,
                "gross_amount": result.data.attributes.totalPrice
            }, "credit_card": {
                "secure": true
            }
        };


        let response = await snap.createTransaction(parameter)
        return response;
    }
}));
