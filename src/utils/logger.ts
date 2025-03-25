const isDev = process.env.NODE_ENV !== 'production';

const logger = {
    info: (...args: any[]) => {
        console.log('📘 [INFO]', ...args);
    },
    warn: (...args: any[]) => {
        console.warn('🟡 [WARN]', ...args);
    },
    error: (...args: any[]) => {
        console.error('❌ [ERROR]', ...args);
    },
    debug: (...args: any[]) => {
        if (isDev) {
            console.debug('🐛 [DEBUG]', ...args);
        }
    }
};

export default logger;
