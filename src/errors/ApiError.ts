export class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public code: string = 'ERROR'
    ) {
        super(message);
        this.name = new.target.name;
    }
}
