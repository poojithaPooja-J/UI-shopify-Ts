import { fa, faker } from "@faker-js/faker";

export class RandomUtil {
    getRandomGmail(): string {
        return faker.internet.email({ provider: "gmail" }).toLowerCase();
    }

    getRandomPassword(length?: number): string {
        return faker.internet.password({ length: length });
    }

    getRandomName(length?: number): string {
        return faker.string.alpha({ length: length });
    }
    getRandomMobileNumber(): string {
        return faker.phone.number();
    }

    getRandomNumber(length?: number): number {
        return faker.number.int({ min: 10, max: 30 });
    }
}