function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(next);

        
    };
};

module.exports = wrapAsync;
// function wrapAsync(fn) {
//     return function(req, res, next) {
//         const result = fn(req, res, next);
//         console.log(result); // Add this line to log the result
//         if (result && typeof result.catch === 'function') {
//             result.catch(next);
//         } else {
//             next(new Error('Function did not return a Promise.'));
//         }
//     }
// }

