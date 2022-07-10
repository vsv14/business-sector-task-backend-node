const configJWT = {
        secret: process.env.JWT_SECRET!,
        tokens: {
            access: {
                type: process.env.JWT_TYPE!,
                expiresIn: process.env.JWT_EXPIRES_IN!
            },
        },
    };

export {
    configJWT,
}