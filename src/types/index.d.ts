
export type TokenData = {
    roleid: number,
    rolename: string
};

declare global{
    namespace Express{
        export interface Request{
            tokenData: TokenData;
        }
    }
}