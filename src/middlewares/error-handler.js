const errorHandler = (err, req, res, next) => {
    console.error(err.stack)

    res.status(err.status || 500).json({
        message: err.message || 'An error ocurred while processing your request',
        error: process.env.NODE_ENV === 'development' ? err : undefined,
    })
}

export default errorHandler