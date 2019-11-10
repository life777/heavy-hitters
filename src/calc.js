/** 
 * This algorithm will work only if the most friquent types of objects will meet with friquency more than k/n
*/

module.exports = (stream, k = 1) => {
    return new Promise((res, rej) => {
        let counters = {};

        stream.on('data', (chunk) => {
            if (chunk === null) {
                return;
            }

            if (counters[chunk]) {
                counters[chunk]++;
                return;
            }

            if (Object.keys(counters).length < k) {
                counters[chunk] = 1;
                return;
            }

            counters = Object.fromEntries(
                Object.entries(counters)
                    .map(([key, count]) => [key, count - 1])
                    .filter(pair => pair[1] > 0)
            );

        });

        stream.on('end', () => {
            const amount = Object.keys(counters).length;

            if (amount < k) {
                rej(new Error(`There are only ${ amount } types of objects`));
            }

            res(Object.keys(counters));
        });
    });
}