

export const asyncHandler = (fn) => (err , req , res , next) => {
    Promise.resolve(fn(err , req , res , next)).catch(next);
}