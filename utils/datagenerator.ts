import { SexType } from '@faker-js/faker';
import { faker } from '@faker-js/faker';

const hobbies = ['Sports','Music','Reading']

interface Student {
    firstName: string;
    lastName: string;
    sex: SexType;
    email: string;
    mobile: string;
    dob: string
    hobby: string
    address: string,     
  }

export class datagenerator{

    static createRandomUser(): Student {
        const sex = faker.person.sexType();
        const firstName = faker.person.firstName(sex);
        const lastName = faker.person.lastName();
        const email = faker.helpers.unique(faker.internet.email, [
            firstName,
            lastName,
        ]);
        const mobile = faker.phone.number();
        const dob = faker.date.birthdate({min: 18, max:75, mode: 'age', refDate: '30-12-2000' }).toString();
        const address = faker.location.streetAddress(true);
        const hobby = faker.helpers.arrayElement(hobbies);
    
        return {
            firstName,
            lastName,
            sex,
            email,
            mobile,
            dob,
            hobby,
            address
        };
      }

      static generateMultipleUsers(usercount){
        const Users = faker.helpers.multiple(datagenerator.createRandomUser, {
            count: usercount,
          });
        return Users;
      }
      
      
}

