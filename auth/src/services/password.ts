import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        // In a real application, you would use a library like bcrypt to hash the password
        // Here, we are just simulating hashing by reversing the string and adding a prefix
        const buf = await scryptAsync(password, salt, 64) as Buffer;
        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        // Simulate comparing the hashed password with the supplied password
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = await scryptAsync(suppliedPassword, salt, 64) as Buffer;
        return buf.toString('hex') === hashedPassword;
    }
}