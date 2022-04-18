const { School } = require('../models');

const resolvers = {
    Query: {
        schools: async () => {
            return School.find();
        },
    }
}