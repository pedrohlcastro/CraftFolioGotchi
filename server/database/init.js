const ENV = process.env.NODE_ENV || 'dev';

module.exports = (mongoose) => {
    if (ENV === 'dev') {
        mongoose.connect('mongodb://localhost:27017/craftfolio', { useCreateIndex: true, useNewUrlParser: true });
        mongoose.connection.on('error', () => { throw new Error('MongoDb failed'); });
        mongoose.connection.once('open', () => {
            // eslint-disable-next-line no-console
            console.log('MongoDB connected');
        });
    }
};
