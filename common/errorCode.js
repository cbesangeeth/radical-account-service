'use strict';

module.exports = {
    OK                     : 'OK',                              // 200
    MULTI_STATUS           : 'MULTI_STATUS',                    // 207
    INVALID_ARGUMENT       : 'INVALID_ARGUMENT',                // 400
    BAD_REQUEST            : 'BAD_REQUEST',                     // 400
    INVALID_HEADER         : 'INVALID_HEADER',                  // 400
    MISSING_HEADER         : 'MISSING_HEADER',                  // 400
    NULL_VALUE             : 'NULL_VALUE',                      // 400
    DUPLICATE              : 'DUPLICATE',                       // 400
    UNAUTHORIZED           : 'UNAUTHORIZED',                    // 401
    ACCESS_DENIED          : 'ACCESS_DENIED',                   // 403
    NOT_FOUND              : 'NOT_FOUND',                       // 404
    METHOD_NOT_ALLOWED     : 'METHOD_NOT_ALLOWED',              // 405
    UNSUPPORTED_MEDIA_TYPE : 'UNSUPPORTED_MEDIA_TYPE',          // 415
    UNPROCESSABLE_ENTITY   : 'UNPROCESSABLE_ENTITY',            // 422
    INTERNAL_SERVER_ERROR  : 'INTERNAL_SERVER_ERROR',           // 500
    CONFLICT               : 'CONFLICT',                        // 409
    ALREADY_EXISTS         : 'ALREADY_EXISTS',
};