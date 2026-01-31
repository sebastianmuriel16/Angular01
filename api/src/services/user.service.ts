import { autoInjectable } from "tsyringe";
import { User } from "../interfaces/user.interface";
import { sign } from "jsonwebtoken";

@autoInjectable()
export class UserService {
    #users: User[] = [];

    login(user: User) {
        const userDB = this.#find(user);
        if (!userDB) {
            throw new Error('User not found');
        }
        if (userDB.password !== user.password) {
            throw new Error('Password incorrect');
        }

        return {
            msg: 'User logged in',
            token: sign({ user: user.email }, 'secret')
        }
    }

    register(user: User) {
        const userDB = this.#find(user);
        if (userDB) {
            throw new Error('User already exists');
        }
        this.#users.push(user);
    }

    #find(user: any): User | undefined {
        return this.#users.find(userDB => userDB.email === user.email);
    }
}