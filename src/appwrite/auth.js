import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

// export class AuthService {
//     client = new Client();
//     account;
//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client);
//     }


//     async signUp({ email, password, name }) {
//         try {
//             const userSignUp = await this.account.create(ID.unique(), email, password, name);
//             if (userSignUp) {
//                 console.log(userSignUp)
//                 return this.login({ email, password });
//             } else {
//                 return userSignUp;
//             }
//         } catch (error) {
//             throw error;
//         }
//     }

//     async login({ email, password }) {
//         try {
//             return await this.account.createEmailSession(email, password);
//         } catch (error) {
//             throw error;
//         }
//     }


//     async getCurrentUser() {
//         try {
//             return await this.account?.get();
//         } catch (error) {
//             console.log("error", error);
//         }
//         return null;
//     }

//     async logout() {
//         try {
//             await this.account.deleteSessions();
//         } catch (error) {
//             console.log("logout error :: ", error);
//         }
//     }
// }

// const authService = new AuthService();

// export default authService;


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                console.log("sign up");
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            console.log("login");
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const service = new AuthService();

export default service;